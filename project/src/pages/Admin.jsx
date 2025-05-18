import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Package,
  User,
  CheckCircle,
  XCircle,
  RefreshCw,
  Store,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

export function Admin() {
  const { orders, isStoreOpen, toggleStoreStatus } = useCart();
  const [localOrders, setLocalOrders] = useState([
    {
      id: 1,
      customer: "João Silva",
      items: [
        { name: "Viking Burger", quantity: 2, price: 32.9 },
        { name: "Batata Cheddar e Bacon", quantity: 1, price: 30.0 },
        { name: "Coca-Cola 350ml", quantity: 2, price: 8.0 },
      ],
      status: "pending",
      time: "19:30",
      address: "Rua das Flores, 123",
      phone: "(11) 98765-4321",
      paymentMethod: "Cartão de Crédito",
      total: 111.8,
    },
    {
      id: 2,
      customer: "Maria Santos",
      items: [
        { name: "Monster Cheese", quantity: 1, price: 36.9 },
        { name: "Milk Shake de Chocolate", quantity: 2, price: 20.0 },
      ],
      status: "preparing",
      time: "19:45",
      address: "Av. Principal, 456",
      phone: "(11) 91234-5678",
      paymentMethod: "PIX",
      total: 76.9,
    },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setLocalOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusColors = {
    pending: "warning",
    preparing: "primary",
    delivering: "info",
    completed: "success",
    cancelled: "danger",
  };

  const statusLabels = {
    pending: "Pendente",
    preparing: "Preparando",
    delivering: "Em Entrega",
    completed: "Concluído",
    cancelled: "Cancelado",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const allOrders = [...localOrders, ...orders];

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-5"
      >
        <h1>Painel de Pedidos</h1>
        <div className="d-flex gap-3">
          <button
            className={`btn ${
              isStoreOpen ? "btn-success" : "btn-danger"
            } d-flex align-items-center gap-2`}
            onClick={toggleStoreStatus}
          >
            <Store size={18} />
            {isStoreOpen ? "Loja Aberta" : "Loja Fechada"}
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <RefreshCw size={18} />
            Atualizar
          </button>
        </div>
      </motion.div>

      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card bg-primary bg-opacity-10 border-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-2">Pedidos Hoje</h6>
                  <h3 className="mb-0">15</h3>
                </div>
                <Package size={32} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success bg-opacity-10 border-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-2">Faturamento</h6>
                  <h3 className="mb-0">R$ 1.250</h3>
                </div>
                <DollarSign size={32} className="text-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning bg-opacity-10 border-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-2">Tempo Médio</h6>
                  <h3 className="mb-0">35 min</h3>
                </div>
                <Clock size={32} className="text-warning" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info bg-opacity-10 border-info">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-2">Clientes</h6>
                  <h3 className="mb-0">125</h3>
                </div>
                <User size={32} className="text-info" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="row g-4"
      >
        {allOrders.map((order) => (
          <motion.div key={order.id} className="col-12" variants={itemVariants}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="card-title mb-1">Pedido #{order.id}</h5>
                    <p className="mb-0 text-muted">
                      <Clock size={16} className="me-1" />
                      {order.time}
                    </p>
                  </div>
                  <span className={`badge bg-${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="mb-2">Cliente</h6>
                    <p className="mb-1">{order.customer}</p>
                    <p className="mb-1">{order.phone}</p>
                    <p className="mb-0">{order.address}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="mb-2">Pagamento</h6>
                    <p className="mb-1">{order.paymentMethod}</p>
                    <p className="mb-0 fw-bold">
                      Total: R$ {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-3">Itens do Pedido</h6>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex gap-2">
                  {order.status === "pending" && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                      >
                        <CheckCircle size={18} className="me-2" />
                        Aceitar Pedido
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                      >
                        <XCircle size={18} className="me-2" />
                        Recusar
                      </button>
                    </>
                  )}
                  {order.status === "preparing" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => updateOrderStatus(order.id, "delivering")}
                    >
                      <Package size={18} className="me-2" />
                      Enviar para Entrega
                    </button>
                  )}
                  {order.status === "delivering" && (
                    <button
                      className="btn btn-success"
                      onClick={() => updateOrderStatus(order.id, "completed")}
                    >
                      <CheckCircle size={18} className="me-2" />
                      Marcar como Entregue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
