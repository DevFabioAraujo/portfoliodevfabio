import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, ShoppingCart, User, Heart } from 'lucide-react'
import ProductGrid from './ProductGrid'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import Checkout from './Checkout'
import CategoryFilter from './CategoryFilter'
import { useEcommerce } from '../../hooks/useEcommerce'

const EcommerceApp = () => {
  const {
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
    getTotalPrice,
    getTotalItems,
    filteredProducts
  } = useEcommerce()

  const renderCurrentView = () => {
    switch (currentView) {
      case 'product':
        return (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={addToCart}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some(fav => fav.id === selectedProduct?.id)}
          />
        )
      case 'cart':
        return (
          <Cart 
            cart={cart}
            onBack={() => setCurrentView('home')}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentView('checkout')}
            totalPrice={getTotalPrice()}
          />
        )
      case 'checkout':
        return (
          <Checkout 
            cart={cart}
            totalPrice={getTotalPrice()}
            onBack={() => setCurrentView('cart')}
            onOrderComplete={() => setCurrentView('home')}
          />
        )
      default:
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Descubra Produtos Incríveis
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  A melhor seleção de produtos com qualidade garantida e entrega rápida
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Ver Ofertas
                  </button>
                  <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                    Cadastre-se
                  </button>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Filters */}
              <div className="lg:w-64 space-y-6">
                <CategoryFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* Price Range */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Faixa de Preço</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="price1" className="rounded" />
                      <label htmlFor="price1" className="text-gray-700">Até R$ 50</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="price2" className="rounded" />
                      <label htmlFor="price2" className="text-gray-700">R$ 50 - R$ 100</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="price3" className="rounded" />
                      <label htmlFor="price3" className="text-gray-700">R$ 100 - R$ 200</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="price4" className="rounded" />
                      <label htmlFor="price4" className="text-gray-700">Acima de R$ 200</label>
                    </div>
                  </div>
                </div>

                {/* Favorites */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Favoritos ({favorites.length})
                  </h3>
                  {favorites.length > 0 ? (
                    <div className="space-y-3">
                      {favorites.slice(0, 3).map(product => (
                        <div 
                          key={product.id}
                          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                          onClick={() => {
                            setSelectedProduct(product)
                            setCurrentView('product')
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              R$ {product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {favorites.length > 3 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{favorites.length - 3} mais
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum favorito ainda</p>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <ProductGrid 
                  products={filteredProducts}
                  onProductSelect={(product) => {
                    setSelectedProduct(product)
                    setCurrentView('product')
                  }}
                  onAddToCart={addToCart}
                  onAddToFavorites={addToFavorites}
                  favorites={favorites}
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar ao Portfólio</span>
              </Link>
              
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              
              <h1 className="text-xl font-bold text-gray-900">TechStore</h1>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechStore</h3>
              <p className="text-gray-400">
                A melhor loja online para produtos de tecnologia e eletrônicos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Fale Conosco</li>
                <li>Trocas e Devoluções</li>
                <li>Garantia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nós</li>
                <li>Trabalhe Conosco</li>
                <li>Imprensa</li>
                <li>Investidores</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default EcommerceApp
