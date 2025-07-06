import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Star, Clock, MapPin } from 'lucide-react';
import useBurger from '../../hooks/useBurger';
import MenuGrid from './MenuGrid';
import CategoryFilter from './CategoryFilter';
import Cart from './Cart';
import BurgerCustomizer from './BurgerCustomizer';
import OrderTracking from './OrderTracking';
import LoyaltyPanel from './LoyaltyPanel';
import NotificationToast from './NotificationToast';

const BurgerApp = () => {
  const {
    // Estados
    cart,
    cartTotals,
    stats,
    filteredItems,
    categories,
    loyalty,
    notifications,
    loading,
    error,
    
    // Estados de UI
    showCart,
    showCustomizer,
    selectedItem,
    showOrderTracking,
    currentOrder,
    
    // Estados de filtros
    searchQuery,
    selectedCategory,
    sortBy,
    
    // Funções
    addToCart,
    toggleCart,
    toggleFavorite,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    openCustomizer,
    closeCustomizer,
    closeOrderTracking,
    createOrder,
    removeFromCart,
    updateCartItem,
    clearCart
  } = useBurger();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoyalty, setShowLoyalty] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLoyalty = () => setShowLoyalty(!showLoyalty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🍔</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BurgerHub
                </h1>
                <p className="text-sm text-gray-600">Hambúrgueres Artesanais</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Menu
              </button>
              <button 
                onClick={toggleLoyalty}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center space-x-1"
              >
                <Star className="w-4 h-4" />
                <span>Fidelidade</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-bold">
                  {stats.loyaltyPoints}
                </span>
              </button>
              <button className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Sobre
              </button>
              <button className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
                Contato
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar hambúrgueres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </div>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {stats.cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {stats.cartItemCount}
                  </span>
                )}
              </button>

              {/* User Button */}
              <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors">
                <User className="w-6 h-6" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="sm:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar hambúrgueres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <button className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Menu
                </button>
                <button 
                  onClick={toggleLoyalty}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium flex items-center space-x-2"
                >
                  <Star className="w-4 h-4" />
                  <span>Fidelidade</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-bold">
                    {stats.loyaltyPoints}
                  </span>
                </button>
                <button className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Sobre
                </button>
                <button className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium">
                  Contato
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Os Melhores Hambúrgueres
            <span className="block text-yellow-300">da Cidade!</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            Ingredientes frescos, receitas artesanais e sabores únicos que vão conquistar seu paladar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Entrega em 25-35 min</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Delivery Grátis acima de R$ 50</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Star className="w-5 h-5" />
              <span className="font-semibold">4.9 ⭐ (2.5k avaliações)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="popular">Mais Popular</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
                <option value="name">Nome A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
              {searchQuery && ` para "${searchQuery}"`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Limpar busca
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Menu Grid */}
        {!loading && (
          <MenuGrid
            items={filteredItems}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onCustomize={openCustomizer}
            favorites={[]}
          />
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou buscar por outro termo
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Ver todos os itens
            </button>
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={showCart}
        onClose={toggleCart}
        cart={cart}
        cartTotals={cartTotals}
        onUpdateItem={updateCartItem}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={createOrder}
      />

      {/* Burger Customizer Modal */}
      <BurgerCustomizer
        isOpen={showCustomizer}
        onClose={closeCustomizer}
        item={selectedItem}
        onAddToCart={addToCart}
      />

      {/* Order Tracking Modal */}
      <OrderTracking
        isOpen={showOrderTracking}
        onClose={closeOrderTracking}
        order={currentOrder}
      />

      {/* Loyalty Panel */}
      <LoyaltyPanel
        isOpen={showLoyalty}
        onClose={() => setShowLoyalty(false)}
        loyalty={loyalty}
      />

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.slice(0, 3).map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>

      {/* Floating Action Button - Mobile */}
      {stats.cartItemCount > 0 && (
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 z-40 md:hidden"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {stats.cartItemCount}
          </span>
        </button>
      )}
    </div>
  );
};

export default BurgerApp;
