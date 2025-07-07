import React from 'react'
import { Star, Heart, ShoppingCart, Eye, Filter, TrendingUp } from 'lucide-react'
import MattressCategories from './MattressCategories'
import { useMattress } from '../../hooks/useMattress'

const MattressShowroom = ({ onProductSelect, onAddToCart, onAddToFavorites, favorites }) => {
  const {
    products,
    selectedCategory,
    selectedBrand,
    selectedSize,
    sortBy,
    setSortBy,
    getBestSellers,
    getPromotionalProducts
  } = useMattress()

  const isProductFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    const success = onAddToCart(product)
    if (!success) {
      alert('Produto fora de estoque!')
    }
  }

  const handleAddToFavorites = (e, product) => {
    e.stopPropagation()
    onAddToFavorites(product)
  }

  const bestSellers = getBestSellers()
  const promotionalProducts = getPromotionalProducts()

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            O Ritual do Sono Perfeito
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Descubra nossa coleção premium de colchões e produtos para o sono ideal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold">18x</div>
              <div className="text-sm opacity-90">SEM JUROS</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold">10%</div>
              <div className="text-sm opacity-90">OFF NO PIX</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold">FRETE</div>
              <div className="text-sm opacity-90">GRÁTIS</div>
            </div>
          </div>
          <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Ver Ofertas
          </button>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Mais Vendidos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {bestSellers.map((product) => (
              <div 
                key={`bestseller-${product.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => onProductSelect(product)}
              >
                <div className="relative h-32 bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters and Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-80 space-y-6">
          <MattressCategories />
          
          {/* Sort Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Ordenar por
            </h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Nome A-Z</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="rating">Melhor avaliados</option>
              <option value="discount">Maior desconto</option>
              <option value="stock">Disponibilidade</option>
            </select>
          </div>

          {/* Promotional Products */}
          {promotionalProducts.length > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 p-6">
              <h3 className="font-semibold text-red-900 mb-4">🔥 Ofertas Especiais</h3>
              <div className="space-y-3">
                {promotionalProducts.slice(0, 3).map(product => (
                  <div 
                    key={`promo-${product.id}`}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                    onClick={() => onProductSelect(product)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 line-through">
                          R$ {product.originalPrice?.toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-red-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                    key={`fav-${product.id}`}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                    onClick={() => onProductSelect(product)}
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

        {/* Main Product Grid */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Results Info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory || 'Todos os Produtos'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {products.length} produto(s) encontrado(s)
                  {selectedBrand !== 'Todas' && ` • Marca: ${selectedBrand}`}
                  {selectedSize !== 'Todos' && ` • Tamanho: ${selectedSize}`}
                </p>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => onProductSelect(product)}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Novo
                          </span>
                        )}
                        {product.discount && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            -{product.discount}%
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => handleAddToFavorites(e, product)}
                          className={`p-2 rounded-full shadow-lg transition-colors ${
                            isProductFavorite(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-gray-600 hover:text-red-500'
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={isProductFavorite(product.id) ? 'currentColor' : 'none'} />
                        </button>
                        
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white text-gray-600 hover:text-blue-500 rounded-full shadow-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.stock === 0}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                            product.stock === 0
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>{product.stock === 0 ? 'Fora de Estoque' : 'Adicionar'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Category & Brand */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {product.brand}
                        </p>
                      </div>

                      {/* Name */}
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="space-y-1 mb-3">
                        {product.originalPrice && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 line-through">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </div>
                        {product.installments && (
                          <p className="text-xs text-gray-500">
                            ou {product.installments.count}x de R$ {product.installments.value.toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.stock > 0 ? (
                            <span className={`text-xs font-medium ${
                              product.stock <= product.minStock 
                                ? 'text-orange-600' 
                                : 'text-green-600'
                            }`}>
                              {product.stock > 10 ? 'Em estoque' : `Últimas ${product.stock} unidades`}
                            </span>
                          ) : (
                            <span className="text-xs text-red-600 font-medium">
                              Fora de estoque
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.size}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Products Found */
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-6">
                  Tente ajustar os filtros ou termos de busca
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MattressShowroom
