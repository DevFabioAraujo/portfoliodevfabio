// Dados completos da hamburgueria
export const categories = [
  { id: 'burgers', name: 'Hambúrgueres', icon: '🍔', color: 'from-red-500 to-orange-500' },
  { id: 'sides', name: 'Acompanhamentos', icon: '🍟', color: 'from-yellow-500 to-orange-500' },
  { id: 'drinks', name: 'Bebidas', icon: '🥤', color: 'from-blue-500 to-cyan-500' },
  { id: 'desserts', name: 'Sobremesas', icon: '🍰', color: 'from-pink-500 to-purple-500' },
  { id: 'combos', name: 'Combos', icon: '🎯', color: 'from-green-500 to-teal-500' }
];

export const ingredients = {
  breads: [
    { id: 'sesame', name: 'Pão com Gergelim', price: 0, image: '🍞' },
    { id: 'brioche', name: 'Pão Brioche', price: 2, image: '🥖' },
    { id: 'whole', name: 'Pão Integral', price: 1.5, image: '🍞' },
    { id: 'pretzel', name: 'Pão Pretzel', price: 3, image: '🥨' }
  ],
  meats: [
    { id: 'beef', name: 'Carne Bovina 150g', price: 8, image: '🥩' },
    { id: 'chicken', name: 'Frango Grelhado 120g', price: 6, image: '🍗' },
    { id: 'fish', name: 'Peixe Grelhado 130g', price: 9, image: '🐟' },
    { id: 'veggie', name: 'Hambúrguer Vegano', price: 7, image: '🌱' },
    { id: 'double', name: 'Dupla Carne 300g', price: 15, image: '🥩🥩' }
  ],
  cheeses: [
    { id: 'cheddar', name: 'Queijo Cheddar', price: 2, image: '🧀' },
    { id: 'swiss', name: 'Queijo Suíço', price: 2.5, image: '🧀' },
    { id: 'gouda', name: 'Queijo Gouda', price: 3, image: '🧀' },
    { id: 'blue', name: 'Queijo Azul', price: 4, image: '🧀' }
  ],
  vegetables: [
    { id: 'lettuce', name: 'Alface', price: 0.5, image: '🥬' },
    { id: 'tomato', name: 'Tomate', price: 0.5, image: '🍅' },
    { id: 'onion', name: 'Cebola', price: 0.5, image: '🧅' },
    { id: 'pickle', name: 'Picles', price: 1, image: '🥒' },
    { id: 'avocado', name: 'Abacate', price: 3, image: '🥑' },
    { id: 'bacon', name: 'Bacon Crocante', price: 4, image: '🥓' }
  ],
  sauces: [
    { id: 'ketchup', name: 'Ketchup', price: 0, image: '🍅' },
    { id: 'mayo', name: 'Maionese', price: 0, image: '🥄' },
    { id: 'mustard', name: 'Mostarda', price: 0, image: '🟡' },
    { id: 'bbq', name: 'Molho BBQ', price: 1, image: '🍖' },
    { id: 'spicy', name: 'Molho Picante', price: 1, image: '🌶️' },
    { id: 'garlic', name: 'Molho de Alho', price: 1.5, image: '🧄' }
  ]
};

export const menuItems = [
  // Hambúrgueres
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    category: 'burgers',
    price: 18.90,
    description: 'Hambúrguer clássico com carne bovina, queijo cheddar, alface, tomate e molho especial',
    image: '🍔',
    rating: 4.8,
    reviews: 245,
    calories: 650,
    prepTime: 15,
    isPopular: true,
    ingredients: ['beef', 'cheddar', 'lettuce', 'tomato', 'mayo'],
    allergens: ['glúten', 'lactose'],
    nutritionalInfo: {
      calories: 650,
      protein: 35,
      carbs: 45,
      fat: 38,
      fiber: 3
    }
  },
  {
    id: 'bacon-deluxe',
    name: 'Bacon Deluxe',
    category: 'burgers',
    price: 24.90,
    description: 'Dupla carne, bacon crocante, queijo suíço, cebola caramelizada e molho BBQ',
    image: '🥓',
    rating: 4.9,
    reviews: 189,
    calories: 890,
    prepTime: 18,
    isPopular: true,
    ingredients: ['double', 'bacon', 'swiss', 'onion', 'bbq'],
    allergens: ['glúten', 'lactose']
  },
  {
    id: 'veggie-supreme',
    name: 'Veggie Supreme',
    category: 'burgers',
    price: 19.90,
    description: 'Hambúrguer vegano com abacate, queijo vegano, rúcula e molho de ervas',
    image: '🌱',
    rating: 4.6,
    reviews: 156,
    calories: 520,
    prepTime: 12,
    isVegan: true,
    ingredients: ['veggie', 'avocado', 'lettuce', 'tomato', 'garlic'],
    allergens: ['glúten']
  },
  {
    id: 'chicken-crispy',
    name: 'Chicken Crispy',
    category: 'burgers',
    price: 21.90,
    description: 'Frango empanado crocante, queijo cheddar, alface americana e maionese temperada',
    image: '🍗',
    rating: 4.7,
    reviews: 203,
    calories: 720,
    prepTime: 16,
    ingredients: ['chicken', 'cheddar', 'lettuce', 'mayo'],
    allergens: ['glúten', 'lactose', 'ovo']
  },

  // Acompanhamentos
  {
    id: 'french-fries',
    name: 'Batata Frita Clássica',
    category: 'sides',
    price: 8.90,
    description: 'Batatas fritas douradas e crocantes com sal marinho',
    image: '🍟',
    rating: 4.5,
    reviews: 312,
    calories: 365,
    prepTime: 8,
    sizes: ['P', 'M', 'G'],
    allergens: []
  },
  {
    id: 'sweet-potato',
    name: 'Batata Doce Frita',
    category: 'sides',
    price: 10.90,
    description: 'Batata doce em fatias grossas com tempero especial',
    image: '🍠',
    rating: 4.6,
    reviews: 187,
    calories: 285,
    prepTime: 10,
    isHealthy: true,
    allergens: []
  },
  {
    id: 'onion-rings',
    name: 'Anéis de Cebola',
    category: 'sides',
    price: 12.90,
    description: 'Anéis de cebola empanados e fritos até ficarem dourados',
    image: '🧅',
    rating: 4.4,
    reviews: 145,
    calories: 410,
    prepTime: 12,
    allergens: ['glúten', 'ovo']
  },
  {
    id: 'chicken-nuggets',
    name: 'Nuggets de Frango',
    category: 'sides',
    price: 14.90,
    description: '8 nuggets de frango empanados com molhos variados',
    image: '🍗',
    rating: 4.7,
    reviews: 234,
    calories: 480,
    prepTime: 10,
    quantity: 8,
    allergens: ['glúten', 'ovo']
  },

  // Bebidas
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    category: 'drinks',
    price: 5.90,
    description: 'Refrigerante Coca-Cola gelado',
    image: '🥤',
    rating: 4.3,
    reviews: 456,
    calories: 140,
    prepTime: 2,
    sizes: ['300ml', '500ml', '1L'],
    allergens: []
  },
  {
    id: 'fresh-juice',
    name: 'Suco Natural',
    category: 'drinks',
    price: 7.90,
    description: 'Suco natural de frutas da estação',
    image: '🧃',
    rating: 4.6,
    reviews: 189,
    calories: 95,
    prepTime: 5,
    isHealthy: true,
    flavors: ['Laranja', 'Maçã', 'Uva', 'Abacaxi'],
    allergens: []
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    category: 'drinks',
    price: 12.90,
    description: 'Milkshake cremoso com sorvete premium',
    image: '🥤',
    rating: 4.8,
    reviews: 267,
    calories: 420,
    prepTime: 8,
    flavors: ['Chocolate', 'Morango', 'Baunilha', 'Oreo'],
    allergens: ['lactose']
  },

  // Sobremesas
  {
    id: 'chocolate-brownie',
    name: 'Brownie de Chocolate',
    category: 'desserts',
    price: 9.90,
    description: 'Brownie quente com sorvete de baunilha e calda de chocolate',
    image: '🍰',
    rating: 4.9,
    reviews: 178,
    calories: 485,
    prepTime: 5,
    allergens: ['glúten', 'lactose', 'ovo']
  },
  {
    id: 'apple-pie',
    name: 'Torta de Maçã',
    category: 'desserts',
    price: 8.90,
    description: 'Torta de maçã caseira com canela e sorvete',
    image: '🥧',
    rating: 4.7,
    reviews: 134,
    calories: 320,
    prepTime: 3,
    allergens: ['glúten', 'lactose', 'ovo']
  },

  // Combos
  {
    id: 'combo-classic',
    name: 'Combo Clássico',
    category: 'combos',
    price: 28.90,
    description: 'Classic Burger + Batata Frita + Refrigerante',
    image: '🎯',
    rating: 4.8,
    reviews: 345,
    calories: 1155,
    prepTime: 15,
    originalPrice: 33.70,
    savings: 4.80,
    includes: ['classic-burger', 'french-fries', 'coca-cola'],
    allergens: ['glúten', 'lactose']
  },
  {
    id: 'combo-deluxe',
    name: 'Combo Deluxe',
    category: 'combos',
    price: 39.90,
    description: 'Bacon Deluxe + Batata Doce + Milkshake',
    image: '🎯',
    rating: 4.9,
    reviews: 234,
    calories: 1595,
    prepTime: 20,
    originalPrice: 48.70,
    savings: 8.80,
    includes: ['bacon-deluxe', 'sweet-potato', 'milkshake'],
    allergens: ['glúten', 'lactose', 'ovo']
  }
];

export const promotions = [
  {
    id: 'happy-hour',
    title: 'Happy Hour',
    description: '30% OFF em todos os combos das 14h às 17h',
    discount: 30,
    type: 'percentage',
    validUntil: '2024-12-31',
    isActive: true,
    image: '🎉',
    conditions: ['combos', 'time:14-17']
  },
  {
    id: 'first-order',
    title: 'Primeira Compra',
    description: 'R$ 10 OFF na sua primeira compra acima de R$ 30',
    discount: 10,
    type: 'fixed',
    validUntil: '2024-12-31',
    isActive: true,
    image: '🎁',
    conditions: ['first-time', 'min-value:30']
  },
  {
    id: 'loyalty-points',
    title: 'Programa Fidelidade',
    description: 'Acumule pontos e ganhe hambúrgueres grátis',
    discount: 0,
    type: 'loyalty',
    isActive: true,
    image: '⭐',
    pointsRatio: 1 // 1 ponto por real gasto
  }
];

export const loyaltyRewards = [
  {
    id: 'free-fries',
    name: 'Batata Frita Grátis',
    points: 100,
    description: 'Batata frita clássica por nossa conta',
    image: '🍟'
  },
  {
    id: 'free-drink',
    name: 'Bebida Grátis',
    points: 150,
    description: 'Refrigerante ou suco natural grátis',
    image: '🥤'
  },
  {
    id: 'free-burger',
    name: 'Hambúrguer Grátis',
    points: 500,
    description: 'Classic Burger completamente grátis',
    image: '🍔'
  },
  {
    id: 'vip-status',
    name: 'Status VIP',
    points: 1000,
    description: 'Descontos exclusivos e prioridade no atendimento',
    image: '👑'
  }
];

export const deliveryZones = [
  { id: 'zone1', name: 'Centro', fee: 3.90, time: '20-30 min' },
  { id: 'zone2', name: 'Zona Norte', fee: 5.90, time: '30-45 min' },
  { id: 'zone3', name: 'Zona Sul', fee: 4.90, time: '25-35 min' },
  { id: 'zone4', name: 'Zona Leste', fee: 6.90, time: '35-50 min' },
  { id: 'zone5', name: 'Zona Oeste', fee: 5.90, time: '30-40 min' }
];

export const paymentMethods = [
  { id: 'credit', name: 'Cartão de Crédito', icon: '💳', fee: 0 },
  { id: 'debit', name: 'Cartão de Débito', icon: '💳', fee: 0 },
  { id: 'pix', name: 'PIX', icon: '📱', fee: 0, discount: 5 },
  { id: 'cash', name: 'Dinheiro', icon: '💵', fee: 0 },
  { id: 'voucher', name: 'Vale Refeição', icon: '🎫', fee: 0 }
];
