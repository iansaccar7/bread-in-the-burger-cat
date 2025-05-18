import React, { createContext, useContext, useState } from "react";
import axios from "axios"; // Instale: npm install axios

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Função para adicionar itens ao carrinho
  const addToCart = (item) => {
    if (!isStoreOpen) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  // Função para remover itens do carrinho
  const removeFromCart = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  // Função para atualizar a quantidade dos itens no carrinho
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Função para calcular o total do carrinho
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Função para processar o pedido e enviar os dados para o backend
  const submitOrder = async (orderDetails) => {
    if (!isStoreOpen) return null;

    // Dados do pedido (incluindo o carrinho e detalhes do cliente)
    const newOrder = {
      orderData: {
        customerName: orderDetails.customer,
        customerEmail: orderDetails.email,
        customerPhone: orderDetails.phone,
        paymentMethod: orderDetails.paymentMethod,
        address: orderDetails.address,
      },
      cartItems: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Dados de pagamento
    const paymentDetails = {
      paymentStatus: "pending", // Status do pagamento (ex: 'pending', 'approved')
      transactionId: "1234567890", // O ID da transação de pagamento (gerado pela plataforma de pagamento)
    };

    // Envia os dados para o backend para criação do pedido
    try {
      const response = await axios.post("http://localhost:3001/orders", {
        orderData: newOrder.orderData,
        cartItems: newOrder.cartItems,
        paymentDetails,
      });

      if (response.data.success) {
        clearCart();
        setOrders((currentOrders) => [
          ...currentOrders,
          { ...newOrder, id: response.data.orderId },
        ]);
        return response.data.orderId;
      } else {
        throw new Error("Erro ao processar o pedido.");
      }
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      return null;
    }
  };

  // Função para alternar o status da loja (aberta ou fechada)
  const toggleStoreStatus = () => {
    setIsStoreOpen((current) => !current);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        isStoreOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        submitOrder,
        toggleStoreStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para acessar o CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
