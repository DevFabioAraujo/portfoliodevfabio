import { useState, useEffect } from 'react'
import { mattressData, mattressCategories } from '../data/mattressData'

export const useMattress = () => {
  const [products, setProducts] = useState(mattressData)
  const [categories] = useState(mattressCategories)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentView, setCurrentView] = useState('showroom') // showroom, product, cart, inventory
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [selectedSize, setSelectedSize] = useState('Todos')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [sortBy, setSortBy] = useState('name')
  const [lowStockAlerts, setLowStockAlerts] = useState([])

  // Calcula alertas de estoque baixo
  useEffect(() => {
    const alerts = products.filter(product => 
      product.stock <= product.minStock && product.stock > 0
    )
    setLowStockAlerts(alerts)
  }, [products])

  // Filtra produtos por categoria, busca, marca, tamanho e preço
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.material.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === 'Todas' || product.brand === selectedBrand
    const matchesSize = selectedSize === 'Todos' || product.size === selectedSize
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    
    return matchesCategory && matchesSearch && matchesBrand && matchesSize && matchesPrice
  })

  // Ordena produtos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'discount':
        return (b.discount || 0) - (a.discount || 0)
      case 'stock':
        return b.stock - a.stock
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  // Adiciona produto ao carrinho
  const addToCart = (product) => {
    if (product.stock <= 0) return false
    
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prevCart
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
    return true
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
    
    const product = products.find(p => p.id === productId)
    if (quantity > product.stock) return
    
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
        return prev.filter(item => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  // Atualiza estoque do produto
  const updateProductStock = (productId, newStock) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    )
  }

  // Adiciona novo produto
  const addProduct = (newProduct) => {
    const id = Math.max(...products.map(p => p.id)) + 1
    const productWithId = { ...newProduct, id }
    setProducts(prevProducts => [...prevProducts, productWithId])
  }

  // Edita produto existente
  const editProduct = (productId, updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    )
  }

  // Remove produto
  const removeProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId))
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

  // Estatísticas do inventário
  const getInventoryStats = () => {
    const totalProducts = products.length
    const totalStock = products.reduce((acc, product) => acc + product.stock, 0)
    const outOfStock = products.filter(product => product.stock === 0).length
    const lowStock = products.filter(product => product.stock <= product.minStock && product.stock > 0).length
    const totalValue = products.reduce((acc, product) => acc + (product.price * product.stock), 0)
    
    return {
      totalProducts,
      totalStock,
      outOfStock,
      lowStock,
      totalValue
    }
  }

  // Produtos mais vendidos (simulado baseado em reviews)
  const getBestSellers = () => {
    return [...products]
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 6)
  }

  // Produtos em promoção
  const getPromotionalProducts = () => {
    return products.filter(product => product.discount && product.discount > 0)
  }

  return {
    // Estado
    products: sortedProducts,
    allProducts: products,
    categories,
    cart,
    favorites,
    searchTerm,
    selectedCategory,
    selectedProduct,
    currentView,
    selectedBrand,
    selectedSize,
    priceRange,
    sortBy,
    lowStockAlerts,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedProduct,
    setCurrentView,
    setSelectedBrand,
    setSelectedSize,
    setPriceRange,
    setSortBy,

    // Ações do carrinho
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToFavorites,
    getTotalItems,
    getTotalPrice,
    clearCart,

    // Ações do inventário
    updateProductStock,
    addProduct,
    editProduct,
    removeProduct,
    getInventoryStats,
    getBestSellers,
    getPromotionalProducts,

    // Dados computados
    filteredProducts: sortedProducts
  }
}
