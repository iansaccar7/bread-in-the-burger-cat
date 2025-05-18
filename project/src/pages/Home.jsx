import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Award, Clock, Star, Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "../../public/logo.svg";

export function Home() {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [burgersRef, burgersInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const featuredBurgers = [
    {
      name: "Viking Burger",
      description:
        "Blend especial, queijo cheddar, bacon crocante, cebola caramelizada",
      price: 32.9,
      image:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    },
    {
      name: "Clássico da Casa",
      description:
        "Blend artesanal, queijo prato, alface, tomate e molho especial",
      price: 28.9,
      image:
        "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    },
    {
      name: "Monster Cheese",
      description: "Duplo blend, triplo queijo, cebola crispy e molho secreto",
      price: 36.9,
      image:
        "https://images.pexels.com/photos/2983098/pexels-photo-2983098.jpeg",
    },
  ];

  const reviews = [
    {
      name: "João Silva",
      rating: 5,
      comment: "Melhor hambúrguer que já comi! O atendimento é excelente.",
      date: "15/03/2024",
    },
    {
      name: "Maria Santos",
      rating: 5,
      comment: "Sabor único e porções generosas. Vale cada centavo!",
      date: "10/03/2024",
    },
    {
      name: "Pedro Oliveira",
      rating: 5,
      comment: "Hambúrguer artesanal de verdade. Voltarei sempre!",
      date: "05/03/2024",
    },
  ];

  return (
    <>
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container text-center hero-content">
          <motion.img
            src={logo}
            alt="Pão no Gato"
            className="hero-logo"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Pão no Gato Burguer
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            O Melhor Hambúrguer Artesanal da Quebrada
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link to="/cardapio" className="btn btn-primary btn-lg">
              Fazer Pedido
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={featuresRef}
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
      >
        <div className="container">
          <h2 className="section-title">Nossa Experiência</h2>
          <div className="row g-4">
            {[
              {
                icon: <Utensils size={40} color="#FFB800" />,
                title: "Ingredientes Premium",
                description:
                  "Selecionamos cuidadosamente cada ingrediente para garantir o sabor incomparável dos nossos burgers",
              },
              {
                icon: <Award size={40} color="#FFB800" />,
                title: "Receitas Exclusivas",
                description:
                  "Cada burger é uma criação única do nosso chef, com combinações que só encontra aqui",
              },
              {
                icon: <Clock size={40} color="#FFB800" />,
                title: "Preparo Artesanal",
                description:
                  "Todo burger é preparado na hora, garantindo frescor e qualidade em cada mordida",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="col-md-4"
                variants={itemVariants}
              >
                <div className="feature-card">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={burgersRef}
        className="py-5"
        variants={containerVariants}
        initial="hidden"
        animate={burgersInView ? "visible" : "hidden"}
      >
        <div className="container">
          <h2 className="section-title">Burgers em Destaque</h2>
          <div className="row g-4">
            {featuredBurgers.map((burger, index) => (
              <motion.div
                key={index}
                className="col-md-4"
                variants={itemVariants}
              >
                <div className="card h-100">
                  <LazyLoadImage
                    src={burger.image}
                    alt={burger.name}
                    effect="blur"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{burger.name}</h5>
                    <p className="card-text">{burger.description}</p>
                    <p className="card-text fw-bold">
                      R$ {burger.price.toFixed(2)}
                    </p>
                    <Link to="/cardapio" className="btn btn-primary w-100">
                      Pedir Agora
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section
        className="py-5"
        style={{ background: "var(--secondary-black)" }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Delivery</h2>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="feature-card">
                  <Truck size={40} color="#FFB800" className="mb-4" />
                  <h3 className="feature-title">Entrega Rápida</h3>
                  <p className="feature-description">
                    Entregamos em toda região do Jardim Arize e bairros
                    próximos. Faça seu pedido pelo nosso cardápio online ou
                    WhatsApp.
                  </p>
                  <div className="mt-4">
                    <MapPin size={20} color="#FFB800" className="me-2" />
                    <span>Área de Entrega: até 5km</span>
                  </div>
                  <div className="mt-2">
                    <Clock size={20} color="#FFB800" className="me-2" />
                    <span>Tempo médio: 30-45 minutos</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <LazyLoadImage
                  src="https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg"
                  alt="Delivery"
                  effect="blur"
                  className="img-fluid rounded-3"
                  style={{ border: "2px solid var(--primary-yellow)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">O Que Dizem Nossos Clientes</h2>
            <div className="row g-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="col-md-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="feature-card">
                    <div className="d-flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          color="#FFB800"
                          fill="#FFB800"
                        />
                      ))}
                    </div>
                    <p className="feature-description mb-4">
                      "{review.comment}"
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="text-light">{review.name}</strong>
                      <small className="text-light">{review.date}</small>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
