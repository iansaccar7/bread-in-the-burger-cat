import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contato</h1>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Informações de Contato</h5>
              <div className="d-flex align-items-center mb-3">
                <MapPin className="me-2" color="#FFB800" />
                <div className="text-light">
                  <p className="mb-0">Rua Costeira, 121 - Jardim Arize</p>
                  <p className="mb-0">São Paulo - SP, 03.573-010</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <Phone className="me-2" color="#FFB800" />
                <p className="mb-0 text-light">(11) 95347-2159</p>
              </div>
              <div className="d-flex align-items-center mb-3">
                <Mail className="me-2" color="#FFB800" />
                <p className="mb-0 text-light">contato@paonogato.com.br</p>
              </div>
              <div className="d-flex align-items-start">
                <Clock className="me-2" color="#FFB800" />
                <div className="text-light">
                  <p className="mb-1">Horário de Funcionamento:</p>
                  <p className="mb-1">Domingo: 18h às 22h45m</p>
                  <p className="mb-1">Quarta a Quinta: 18h às 22h45m</p>
                  <p className="mb-0">Sexta e Sábado: 18h às 23h45m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Envie uma Mensagem</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Mensagem</label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows="4" 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar Mensagem</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="ratio ratio-16x9">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1598462773274!2d-46.4558331!3d-23.5617001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce66bf22458913%3A0x3c7828457a460bc5!2sR.%20Costeira%2C%20121%20-%20Jardim%20Arize%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003573-010!5e0!3m2!1sen!2sbr!4v1635959601234!5m2!1sen!2sbr"
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            className="rounded-3"
          ></iframe>
        </div>
      </div>
    </div>
  );
}