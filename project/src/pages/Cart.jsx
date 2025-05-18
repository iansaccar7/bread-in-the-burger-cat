import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  MapPin,
  CreditCard,
  Wallet,
  QrCode,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal, submitOrder } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    customer: "",
    phone: "",
    address: "",
    complement: "",
    paymentMethod: "",
    change: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const order = submitOrder(orderDetails);
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione alguns itens deliciosos do nosso cardápio!</p>
      </div>
    );
  }

  if (isCheckingOut) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Finalizar Pedido</h2>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleSubmitOrder}>
                  <h5 className="card-title mb-4">Informações de Entrega</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        name="customer"
                        value={orderDetails.customer}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Telefone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={orderDetails.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Endereço</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={orderDetails.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Complemento</label>
                      <input
                        type="text"
                        className="form-control"
                        name="complement"
                        value={orderDetails.complement}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <h5 className="card-title mt-4 mb-4">Forma de Pagamento</h5>
                  <div className="d-flex flex-column gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        id="pix"
                        value="PIX"
                        checked={orderDetails.paymentMethod === "PIX"}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        className="form-check-label d-flex align-items-center gap-2"
                        htmlFor="pix"
                      >
                        <QrCode size={20} />
                        PIX
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        id="credit"
                        value="Cartão de Crédito"
                        checked={
                          orderDetails.paymentMethod === "Cartão de Crédito"
                        }
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label d-flex align-items-center gap-2"
                        htmlFor="credit"
                      >
                        <CreditCard size={20} />
                        Cartão de Crédito
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        id="cash"
                        value="Dinheiro"
                        checked={orderDetails.paymentMethod === "Dinheiro"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label d-flex align-items-center gap-2"
                        htmlFor="cash"
                      >
                        <Wallet size={20} />
                        Dinheiro
                      </label>
                    </div>
                  </div>

                  {orderDetails.paymentMethod === "Dinheiro" && (
                    <div className="mt-3">
                      <label className="form-label">Troco para quanto?</label>
                      <input
                        type="number"
                        className="form-control"
                        name="change"
                        value={orderDetails.change}
                        onChange={handleInputChange}
                        min={getTotal() + 5}
                        step="0.01"
                        required
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-100">
                      Confirmar Pedido
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 mt-2"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      Voltar ao Carrinho
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Resumo do Pedido</h5>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>R$ {getTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxa de entrega</span>
                  <span>R$ 5,00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>R$ {(getTotal() + 5).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.name}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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
              <button
                className="btn btn-primary w-100"
                onClick={() => setIsCheckingOut(true)}
              >
                <MapPin size={18} className="me-2" />
                Prosseguir para Entrega
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
