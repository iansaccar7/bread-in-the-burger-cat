import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">Pão no Gato Burguer</h5>
            <p>Clássico da Quebrada - Os melhores burgers artesanais da região!</p>
            <div className="social-icons mt-3">
              <a href="https://instagram.com/paonogatoburguer" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com/paonogatoburguer" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">
              <Clock size={20} className="me-2" />
              Horário
            </h5>
            <ul className="list-unstyled">
              <li>Domingo: 18h às 22h45m</li>
              <li>Quarta a Quinta: 18h às 22h45m</li>
              <li>Sexta e Sábado: 18h às 23h45m</li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4">
            <h5 className="mb-3">
              <MapPin size={20} className="me-2" />
              Endereço
            </h5>
            <p>Rua Costeira, 121 - Jardim Arize</p>
            <p>São Paulo - SP, 03.573-010</p>
          </div>

          <div className="col-lg-3">
            <h5 className="mb-3">Contato</h5>
            <div className="mt-3">
              <div className="d-flex align-items-center mb-2">
                <Phone size={20} className="me-2" />
                <p className="mb-0">(11) 95347-2159</p>
              </div>
              <div className="d-flex align-items-center">
                <Mail size={20} className="me-2" />
                <p className="mb-0">contato@paonogato.com.br</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">© 2024 Pão no Gato Burguer. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}