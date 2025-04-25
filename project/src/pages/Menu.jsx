import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Plus, Minus, ShoppingBag, Beef, Rotate3D as Potato, Drumstick, Beer, HandshakeIcon as MilkshakeIcon, Search } from 'lucide-react';
import 'react-lazy-load-image-component/src/effects/blur.css';

const menuItems = {
  burgers: [
    {
      id: 25,
      name: 'Viking Burger',
      description: 'Blend especial, queijo cheddar, bacon crocante, cebola caramelizada e molho viking.',
      price: 32.90,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
      popular: true
    },
    {
      id: 26,
      name: 'Clássico da Casa',
      description: 'Blend artesanal, queijo prato, alface, tomate e molho especial.',
      price: 28.90,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
    },
    {
      id: 27,
      name: 'Monster Cheese',
      description: 'Duplo blend, triplo queijo, cebola crispy e molho secreto.',
      price: 36.90,
      image: 'https://images.pexels.com/photos/2983098/pexels-photo-2983098.jpeg',
      popular: true
    },
    {
      id: 28,
      name: 'BBQ Burger',
      description: 'Blend especial, queijo cheddar, bacon, onion rings e molho barbecue.',
      price: 34.90,
      image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg'
    },
    {
      id: 29,
      name: 'Veggie Supreme',
      description: 'Hambúrguer de grão de bico, queijo vegano, alface, tomate e molho especial.',
      price: 30.90,
      image: 'https://images.pexels.com/photos/3607224/pexels-photo-3607224.jpeg'
    }
  ],
  fries: [
    {
      id: 1,
      name: 'Porção Batata Vikings',
      description: 'Batata crinkle, catupiry, cream cheese, molho ranch, pimenta biquinho, alho frito, bacon e salsinha.',
      price: 35.00,
      image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg',
      popular: true
    },
    {
      id: 2,
      name: 'Batata Cheddar e Bacon',
      description: 'Batata frita com cheddar cremoso, bacon picadinho e cebolinha. (350g)',
      price: 30.00,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg'
    },
    {
      id: 3,
      name: 'A Rústica',
      description: 'Batata rústica, bacon, cebolinha fresca, com acompanhamentos diversos.',
      price: 33.00,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
    },
    {
      id: 4,
      name: 'Palito e Sal & Páprica',
      description: '350g de batatas fritas.',
      price: 19.00,
      image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg'
    },
    {
      id: 31,
      name: 'Onion Rings',
      description: 'Anéis de cebola empanados e fritos, acompanha molho especial.',
      price: 25.00,
      image: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg'
    }
  ],
  chicken: [
    {
      id: 5,
      name: 'Korea Chicken',
      description: '500g de coxinhas de frango empanadas e fritas com molho glaceado.',
      price: 25.00,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
      popular: true
    },
    {
      id: 6,
      name: 'Box Chicken 2',
      description: 'Coxinha da asa empanada e frita, estilo americano, acompanha molho de sheriff. (1KG)',
      price: 45.00,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg'
    },
    {
      id: 7,
      name: 'Chicken Supreme',
      description: '10 unidades de chicken supreme com molho caipira.',
      price: 21.00,
      image: 'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg'
    },
    {
      id: 32,
      name: 'Buffalo Wings',
      description: 'Asinhas de frango com molho buffalo picante e cream cheese.',
      price: 35.00,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
    }
  ],
  drinks: [
    {
      id: 8,
      name: 'Coca-cola 2L',
      description: 'Coca-Cola gelada.',
      price: 16.00,
      image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg'
    },
    {
      id: 9,
      name: 'Coca-Cola 350ml',
      description: 'Coca-Cola em lata.',
      price: 8.00,
      image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg'
    },
    {
      id: 10,
      name: 'Itubaina lata 350ml',
      description: 'Refrigerante Itubaina.',
      price: 7.00,
      image: 'https://images.pexels.com/photos/2983102/pexels-photo-2983102.jpeg'
    },
    {
      id: 11,
      name: 'Fanta Guaraná 350ml',
      description: 'Fanta Guaraná em lata.',
      price: 8.00,
      image: 'https://images.pexels.com/photos/2983103/pexels-photo-2983103.jpeg'
    },
    {
      id: 12,
      name: 'Coca Cola Zero 350ml',
      description: 'Coca-Cola Zero.',
      price: 8.00,
      image: 'https://images.pexels.com/photos/2983104/pexels-photo-2983104.jpeg'
    }
  ],
  beers: [
    {
      id: 18,
      name: 'Cerveja Colorado 600ml',
      description: 'Puro malte / Porter com café / Lager com mandioca.',
      price: 12.00,
      image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg'
    },
    {
      id: 19,
      name: 'Budweiser 350ml',
      description: 'Cerveja Budweiser.',
      price: 8.00,
      image: 'https://images.pexels.com/photos/1672304/pexels-photo-1672304.jpeg'
    },
    {
      id: 20,
      name: 'Cerveja Patagonia 350ml',
      description: 'Amber Lager / Weiss / Bohemian Pilsener.',
      price: 12.00,
      image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg'
    },
    {
      id: 33,
      name: 'Heineken 350ml',
      description: 'Cerveja Heineken Premium Lager.',
      price: 9.00,
      image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg'
    }
  ],
  milkshakes: [
    {
      id: 14,
      name: 'Milk Shake de Chocolate',
      description: 'Massa de chocolate trufada e calda de chocolate. (440ml)',
      price: 20.00,
      image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg',
      popular: true
    },
    {
      id: 15,
      name: 'Milk Shake de Frutas Vermelhas',
      description: 'Creme americano com calda de frutas vermelhas. (440ml)',
      price: 20.00,
      image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg'
    },
    {
      id: 34,
      name: 'Milk Shake de Oreo',
      description: 'Milk shake cremoso com pedaços de Oreo e calda de chocolate.',
      price: 22.00,
      image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg'
    }
  ]
};

export function Menu() {
  const { addToCart, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = {
    burgers: { name: 'Hamburguers', icon: Beef },
    fries: { name: 'Batatas', icon: Potato },
    chicken: { name: 'Frango', icon: Drumstick },
    drinks: { name: 'Bebidas', icon: Beer },
    beers: { name: 'Cervejas', icon: Beer },
    milkshakes: { name: 'Milk Shakes', icon: MilkshakeIcon }
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity });
    setSelectedItem(null);
    setQuantity(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredItems = menuItems[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <motion.h1 
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cardápio
      </motion.h1>

      <motion.div 
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="input-group">
          <span className="input-group-text">
            <Search size={20} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar no cardápio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="d-flex justify-content-center flex-wrap gap-2 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {Object.entries(categories).map(([key, { name, icon: Icon }]) => (
          <motion.button
            key={key}
            className={`btn ${activeCategory === key ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center gap-2`}
            onClick={() => setActiveCategory(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={18} />
            {name}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory}
      >
        {filteredItems.map((item) => (
          <motion.div 
            key={item.id} 
            className="col-md-4"
            variants={itemVariants}
          >
            <div className="card h-100 position-relative">
              {item.popular && (
                <div 
                  className="position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill"
                  style={{ 
                    background: 'var(--accent-orange)',
                    color: 'var(--text-light)',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}
                >
                  Popular
                </div>
              )}
              <LazyLoadImage
                src={item.image}
                alt={item.name}
                effect="blur"
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text fw-bold">R$ {item.price.toFixed(2)}</p>
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => setSelectedItem(item)}
                >
                  <ShoppingBag size={18} className="me-2" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ background: 'rgba(0,0,0,0.8)', zIndex: 1050 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-dark p-4 rounded-3 shadow-lg"
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '400px', width: '90%' }}
            >
              <h4 className="text-center mb-4">{selectedItem.name}</h4>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={18} />
                </button>
                <span className="mx-4 fs-5">{quantity}</span>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-center mb-4">
                Total: R$ {(selectedItem.price * quantity).toFixed(2)}
              </p>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-primary w-50"
                  onClick={() => setSelectedItem(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary w-50"
                  onClick={() => handleAddToCart(selectedItem)}
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}