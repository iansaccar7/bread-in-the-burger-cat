import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { StoreClosedOverlay } from "./components/StoreClosedOverlay";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import "./index.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <StoreClosedOverlay />
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cardapio" element={<Menu />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
