import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione alguns itens deliciosos do nosso cardápio!</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5">Seu Carrinho</h1>
      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.image} className="img-fluid rounded-start" alt={item.name} style={{ height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title">{item.name}</h5>
                      <button 
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="card-text">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="card-text fw-bold mb-0">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumo do Pedido</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>R$ {getTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Taxa de entrega</span>
                <span>R$ 5,00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>R$ {(getTotal() + 5).toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary w-100">
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}