import { useState } from 'react'

const initialProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Eletrônicos',
    price: 8999.99,
    originalPrice: 9999.99,
    discount: 10,
    rating: 4.8,
    reviews: 324,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
    isNew: true,
    installments: { count: 12, value: 749.99 },
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    weight: '221g'
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Computadores',
    price: 12999.99,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviews: 156,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
    isNew: true,
    installments: { count: 12, value: 1083.33 },
    brand: 'Apple',
    model: 'MacBook Pro M3',
    weight: '1.6kg'
  },
  {
    id: 3,
    name: 'AirPods Pro 2ª Geração',
    category: 'Acessórios',
    price: 1899.99,
    originalPrice: 2299.99,
    discount: 17,
    rating: 4.7,
    reviews: 892,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
    isNew: false,
    installments: { count: 10, value: 189.99 },
    brand: 'Apple',
    model: 'AirPods Pro 2',
    weight: '56g'
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Eletrônicos',
    price: 7499.99,
    originalPrice: 8299.99,
    discount: 10,
    rating: 4.6,
    reviews: 267,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
    isNew: true,
    installments: { count: 12, value: 624.99 },
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    weight: '232g'
  },
  {
    id: 5,
    name: 'Dell XPS 13',
    category: 'Computadores',
    price: 6999.99,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    reviews: 89,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    isNew: false,
    installments: { count: 12, value: 583.33 },
    brand: 'Dell',
    model: 'XPS 13',
    weight: '1.2kg'
  },
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    category: 'Acessórios',
    price: 1599.99,
    originalPrice: 1899.99,
    discount: 16,
    rating: 4.8,
    reviews: 445,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    isNew: false,
    installments: { count: 8, value: 199.99 },
    brand: 'Sony',
    model: 'WH-1000XM5',
    weight: '250g'
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    category: 'Eletrônicos',
    price: 9999.99,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviews: 178,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    isNew: true,
    installments: { count: 12, value: 833.33 },
    brand: 'Apple',
    model: 'iPad Pro 12.9',
    weight: '682g'
  },
  {
    id: 8,
    name: 'Apple Watch Series 9',
    category: 'Wearables',
    price: 3299.99,
    originalPrice: 3699.99,
    discount: 11,
    rating: 4.6,
    reviews: 523,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
    isNew: true,
    installments: { count: 10, value: 329.99 },
    brand: 'Apple',
    model: 'Watch Series 9',
    weight: '38g'
  },
  {
    id: 9,
    name: 'Echo Dot 5ª Geração',
    category: 'Smart Home',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.3,
    reviews: 1247,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop',
    isNew: false,
    installments: { count: 6, value: 49.99 },
    brand: 'Amazon',
    model: 'Echo Dot 5',
    weight: '304g'
  },
  {
    id: 10,
    name: 'Nintendo Switch OLED',
    category: 'Eletrônicos',
    price: 2199.99,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviews: 678,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop',
    isNew: false,
    installments: { count: 10, value: 219.99 },
    brand: 'Nintendo',
    model: 'Switch OLED',
    weight: '420g'
  }
]

const categories = [
  { name: 'Todos', icon: '🛍️' },
  { name: 'Eletrônicos', icon: '📱' },
  { name: 'Computadores', icon: '💻' },
  { name: 'Acessórios', icon: '🎧' },
  { name: 'Smart Home', icon: '🏠' },
  { name: 'Wearables', icon: '⌚' }
]

export const useEcommerce = () => {
  const [products] = useState(initialProducts)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentView, setCurrentView] = useState('home') // home, product, cart, checkout

  // Filtra produtos por categoria e busca
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Adiciona produto ao carrinho
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Remove produto do carrinho
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Atualiza quantidade no carrinho
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Adiciona aos favoritos
  const addToFavorites = (product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        // Remove se já existe (toggle)
        return prev.filter(item => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  // Remove dos favoritos
  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
  }

  // Total de itens no carrinho
  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  // Total do carrinho
  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  // Limpa carrinho
  const clearCart = () => {
    setCart([])
  }

  return {
    products,
    categories,
    cart,
    favorites,
    searchTerm,
    selectedCategory,
    selectedProduct,
    currentView,
    setSearchTerm,
    setSelectedCategory,
    setSelectedProduct,
    setCurrentView,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToFavorites,
    removeFromFavorites,
    getTotalItems,
    getTotalPrice,
    clearCart,
    filteredProducts
  }
}
