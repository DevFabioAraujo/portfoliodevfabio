import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, ShoppingCart, User, Settings, AlertTriangle } from 'lucide-react'
import MattressShowroom from './MattressShowroom'
import MattressDetail from './MattressDetail'
import InventoryManager from './InventoryManager'
import Cart from './Cart'
import { useMattress } from '../../hooks/useMattress'

const MattressApp = () => {
  const {
    cart,
    searchTerm,
    currentView,
    lowStockAlerts,
    setSearchTerm,
    setCurrentView,
    getTotalItems,
    getTotalPrice,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToFavorites,
    selectedProduct,
    setSelectedProduct,
    favorites,
    updateProductStock,
    addProduct,
    editProduct,
    removeProduct,
    getInventoryStats
  } = useMattress()

  const renderCurrentView = () => {
    switch (currentView) {
      case 'product':
        return (
          <MattressDetail 
            product={selectedProduct}
            onBack={() => setCurrentView('showroom')}
            onAddToCart={addToCart}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some(fav => fav.id === selectedProduct?.id)}
          />
        )
      case 'cart':
        return (
          <Cart 
            cart={cart}
            onBack={() => setCurrentView('showroom')}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={getTotalPrice()}
          />
        )
      case 'inventory':
        return (
          <InventoryManager 
            onBack={() => setCurrentView('showroom')}
            onUpdateStock={updateProductStock}
            onAddProduct={addProduct}
            onEditProduct={editProduct}
            onRemoveProduct={removeProduct}
            inventoryStats={getInventoryStats()}
          />
        )
      default:
        return (
          <MattressShowroom 
            onProductSelect={(product) => {
              setSelectedProduct(product)
              setCurrentView('product')
            }}
            onAddToCart={addToCart}
            onAddToFavorites={addToFavorites}
            favorites={favorites}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🛏️</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Sleep House</h1>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar colchões, travesseiros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Low Stock Alert */}
              {lowStockAlerts.length > 0 && (
                <button 
                  onClick={() => setCurrentView('inventory')}
                  className="relative p-2 text-orange-600 hover:text-orange-700 transition-colors"
                  title={`${lowStockAlerts.length} produtos com estoque baixo`}
                >
                  <AlertTriangle className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {lowStockAlerts.length}
                  </span>
                </button>
              )}

              {/* Inventory Management */}
              <button 
                onClick={() => setCurrentView('inventory')}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Gerenciar Inventário"
              >
                <Settings className="w-6 h-6" />
              </button>

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
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🛏️</span>
                </div>
                <h3 className="text-lg font-semibold">Sleep House</h3>
              </div>
              <p className="text-gray-400">
                Sua loja especializada em colchões e produtos para o sono perfeito.
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
                <li>Nossas Lojas</li>
                <li>Sustentabilidade</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>YouTube</li>
                <li>WhatsApp</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sleep House. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MattressApp
