import React from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, Home, UtensilsCrossed, Phone } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import logo from "../../public/logo.svg";

export function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Pão no Gato" className="logo" />
          <span>Pão no Gato Burguer</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <Menu color="#FFB800" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <Home size={18} className="me-1" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/cardapio"
              >
                <UtensilsCrossed size={18} className="me-1" />
                Cardápio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center"
                to="/contato"
              >
                <Phone size={18} className="me-1" />
                Contato
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link to="/carrinho" className="nav-link position-relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
