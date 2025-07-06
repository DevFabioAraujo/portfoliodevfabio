import React from 'react'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'

const ProductGrid = ({ 
  products, 
  onProductSelect, 
  onAddToCart, 
  onAddToFavorites, 
  favorites,
  searchTerm,
  selectedCategory 
}) => {
  const isProductFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    onAddToCart(product)
  }

  const handleAddToFavorites = (e, product) => {
    e.stopPropagation()
    onAddToFavorites(product)
  }

  return (
    <div className="space-y-6">
      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory || 'Todos os Produtos'}
          </h2>
          <p className="text-gray-600 mt-1">
            {searchTerm && `Resultados para "${searchTerm}" - `}
            {products.length} produto(s) encontrado(s)
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Ordenar por</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
            <option>Mais vendidos</option>
            <option>Melhor avaliados</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.category}
                </p>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  {product.installments && (
                    <span className="text-xs text-gray-500">
                      {product.installments.count}x R$ {product.installments.value.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mt-2">
                  {product.stock > 0 ? (
                    <span className="text-xs text-green-600 font-medium">
                      {product.stock > 10 ? 'Em estoque' : `Últimas ${product.stock} unidades`}
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">
                      Fora de estoque
                    </span>
                  )}
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

      {/* Load More */}
      {products.length > 0 && products.length >= 12 && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Carregar Mais Produtos
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
