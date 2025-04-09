const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database for products
const products = [
  {
    id: '1',
    name: 'Audífono Digital Avanzado',
    description: 'Audífono digital con tecnología de reducción de ruido y conectividad Bluetooth.',
    price: 1299.99,
    image: 'https://placehold.co/400x200/4a6de5/ffffff?text=Audífono+Digital',
    category: 'hearing-aids',
    specs: [
      { name: 'Tipo', value: 'Digital' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Duración de batería', value: 'Hasta 24 horas' },
      { name: 'Resistencia al agua', value: 'IP57' },
      { name: 'Garantía', value: '2 años' }
    ],
    features: [
      'Reducción de ruido avanzada',
      'Conectividad Bluetooth para streaming de audio',
      'Control mediante aplicación móvil',
      'Ajustes automáticos según el entorno',
      'Batería recargable de larga duración'
    ],
    stock: 15
  },
  {
    id: '2',
    name: 'Implante Coclear Moderno',
    description: 'Implante coclear con procesador de sonido avanzado y resistencia al agua.',
    price: 2499.99,
    image: 'https://placehold.co/400x200/ff6b6b/ffffff?text=Implante+Coclear',
    category: 'implants',
    specs: [
      { name: 'Tipo', value: 'Implante coclear' },
      { name: 'Procesador', value: 'Digital avanzado' },
      { name: 'Conectividad', value: 'Bluetooth y WiFi' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Resistencia al agua', value: 'IP68' },
      { name: 'Garantía', value: '5 años' }
    ],
    features: [
      'Procesamiento de sonido de alta definición',
      'Resistente al agua para uso en actividades acuáticas',
      'Conectividad inalámbrica para streaming directo',
      'Múltiples programas para diferentes entornos',
      'Compatible con accesorios inalámbricos'
    ],
    stock: 8
  },
  {
    id: '3',
    name: 'Micrófono Remoto',
    description: 'Micrófono remoto para mejorar la captación de sonido en entornos ruidosos.',
    price: 349.99,
    image: 'https://placehold.co/400x200/23d160/ffffff?text=Micrófono+Remoto',
    category: 'accessories',
    specs: [
      { name: 'Tipo', value: 'Micrófono remoto' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Alcance', value: 'Hasta 25 metros' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Duración de batería', value: 'Hasta 10 horas' },
      { name: 'Garantía', value: '1 año' }
    ],
    features: [
      'Mejora la captación de voz en entornos ruidosos',
      'Conexión directa con audífonos compatibles',
      'Diseño discreto y portátil',
      'Fácil de usar con un solo botón',
      'Incluye clip para sujetar a la ropa'
    ],
    stock: 25
  },
  {
    id: '4',
    name: 'Audífono Recargable',
    description: 'Audífono con batería recargable de larga duración y cargador incluido.',
    price: 899.99,
    image: 'https://placehold.co/400x200/ffd166/ffffff?text=Audífono+Recargable',
    category: 'hearing-aids',
    specs: [
      { name: 'Tipo', value: 'Digital recargable' },
      { name: 'Conectividad', value: 'Bluetooth' },
      { name: 'Batería', value: 'Recargable de litio' },
      { name: 'Duración de batería', value: 'Hasta 30 horas' },
      { name: 'Resistencia al agua', value: 'IP57' },
      { name: 'Garantía', value: '2 años' }
    ],
    features: [
      'Batería recargable de larga duración',
      'Cargador rápido incluido',
      'Tecnología de reducción de ruido',
      'Ajustes personalizables',
      'Diseño discreto y cómodo'
    ],
    stock: 20
  },
  {
    id: '5',
    name: 'Procesador de Sonido',
    description: 'Procesador de sonido externo para implantes cocleares con múltiples programas.',
    price: 1599.99,
    image: 'https://placehold.co/400x200/4a6de5/ffffff?text=Procesador+de+Sonido',
    category: 'implants',
    specs: [
      { name: 'Tipo', value: 'Procesador externo' },
      { name: 'Compatibilidad', value: 'Implantes cocleares serie X' },
      { name: 'Programas', value: '6 programas personalizables' },
      { name: 'Batería', value: 'Recargable' },
      { name: 'Duración de batería', value: 'Hasta 18 horas' },
      { name: 'Garantía', value: '3 años' }
    ],
    features: [
      'Procesamiento avanzado de señales de audio',
      'Reducción de ruido adaptativa',
      'Conectividad inalámbrica',
      'Resistente al agua y polvo',
      'Compatible con accesorios inalámbricos'
    ],
    stock: 12
  },
  {
    id: '6',
    name: 'Adaptador TV',
    description: 'Adaptador para conectar audífonos directamente a la televisión sin interferencias.',
    price: 199.99,
    image: 'https://placehold.co/400x200/23d160/ffffff?text=Adaptador+TV',
    category: 'accessories',
    specs: [
      { name: 'Tipo', value: 'Adaptador de audio' },
      { name: 'Conectividad', value: 'Bluetooth y entrada óptica' },
      { name: 'Alcance', value: 'Hasta 30 metros' },
      { name: 'Alimentación', value: 'USB o adaptador AC' },
      { name: 'Compatibilidad', value: 'Universal' },
      { name: 'Garantía', value: '1 año' }
    ],
    features: [
      'Transmisión de audio de alta calidad',
      'Fácil configuración con cualquier televisor',
      'Conexión simultánea con múltiples audífonos',
      'Ajuste de volumen independiente',
      'Diseño compacto y elegante'
    ],
    stock: 30
  }
];

// Mock database for orders
let orders = [];

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  res.json(product);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category === req.params.category);
  res.json(categoryProducts);
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const { items, customerInfo, shippingAddress, paymentMethod, total } = req.body;
  
  if (!items || !customerInfo || !shippingAddress || !paymentMethod || !total) {
    return res.status(400).json({ message: 'Faltan datos requeridos para crear el pedido' });
  }
  
  const newOrder = {
    id: Date.now().toString(),
    items,
    customerInfo,
    shippingAddress,
    paymentMethod,
    total,
    status: 'pending',
    createdAt: new Date()
  };
  
  orders.push(newOrder);
  
  res.status(201).json({
    message: 'Pedido creado con éxito',
    orderId: newOrder.id,
    order: newOrder
  });
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }
  
  res.json(order);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;