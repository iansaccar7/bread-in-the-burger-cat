import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function StoreClosedOverlay() {
  const { isStoreOpen } = useCart();
  const location = useLocation();

  // Don't show overlay on admin page
  if (isStoreOpen || location.pathname === "/admin") return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 9999,
      }}
    >
      <div className="text-center">
        <h1
          className="display-1 mb-4"
          style={{ color: "var(--primary-yellow)" }}
        >
          Loja Fechada
        </h1>
        <p className="lead text-light">
          Voltaremos em breve com mais sabor para você!
        </p>
        <p className="text-light mt-3">
          Horário de Funcionamento:
          <br />
          Domingo: 18h às 22h45m
          <br />
          Quarta a Quinta: 18h às 22h45m
          <br />
          Sexta e Sábado: 18h às 23h45m
        </p>
      </div>
    </div>
  );
}
