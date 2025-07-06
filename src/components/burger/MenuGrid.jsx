import React from 'react';
import { Plus, Heart, Star, Clock, Flame, Leaf } from 'lucide-react';

const MenuGrid = ({ items, onAddToCart, onToggleFavorite, onCustomize, favorites = [] }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getBadges = (item) => {
    const badges = [];
    
    if (item.isPopular) {
      badges.push({
        text: 'Popular',
        icon: <Flame className="w-3 h-3" />,
        className: 'bg-red-100 text-red-800'
      });
    }
    
    if (item.isVegan) {
      badges.push({
        text: 'Vegano',
        icon: <Leaf className="w-3 h-3" />,
        className: 'bg-green-100 text-green-800'
      });
    }
    
    if (item.isHealthy) {
      badges.push({
        text: 'Saudável',
        icon: <Heart className="w-3 h-3" />,
        className: 'bg-blue-100 text-blue-800'
      });
    }

    if (item.originalPrice && item.originalPrice > item.price) {
      const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
      badges.push({
        text: `-${discount}%`,
        className: 'bg-orange-100 text-orange-800'
      });
    }

    return badges;
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍔</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhum item encontrado
        </h3>
        <p className="text-gray-600">
          Tente ajustar seus filtros ou buscar por outro termo
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => {
        const isFavorite = favorites.includes(item.id);
        const badges = getBadges(item);

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
          >
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {item.image}
              </div>
              
              {/* Badges */}
              {badges.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {badges.map((badge, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}
                    >
                      {badge.icon}
                      <span>{badge.text}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite(item.id)}
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Add Button */}
              <button
                onClick={() => onAddToCart(item)}
                className="absolute bottom-3 right-3 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 opacity-0 group-hover:opacity-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-2">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
              </div>

              {/* Rating and Reviews */}
              {item.rating && (
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.rating}
                  </span>
                  {item.reviews && (
                    <span className="text-sm text-gray-500">
                      ({item.reviews})
                    </span>
                  )}
                </div>
              )}

              {/* Info Row */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.prepTime || 15} min</span>
                </div>
                {item.calories && (
                  <div className="flex items-center space-x-1">
                    <Flame className="w-3 h-3" />
                    <span>{item.calories} cal</span>
                  </div>
                )}
              </div>

              {/* Allergens */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Contém:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.allergens.map((allergen) => (
                      <span
                        key={allergen}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  {item.savings && (
                    <span className="text-xs text-green-600 font-medium">
                      Economize {formatPrice(item.savings)}
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  {/* Customize Button */}
                  {item.category === 'burgers' && (
                    <button
                      onClick={() => onCustomize(item)}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Personalizar
                    </button>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>

              {/* Combo Items */}
              {item.includes && item.includes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">Inclui:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.includes.map((includeId, index) => (
                      <span
                        key={includeId}
                        className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs"
                      >
                        Item {index + 1}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-2">Tamanhos disponíveis:</p>
                  <div className="flex space-x-2">
                    {item.sizes.map((size) => (
                      <span
                        key={size}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors */}
              {item.flavors && item.flavors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 mb-2">Sabores:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.flavors.slice(0, 3).map((flavor) => (
                      <span
                        key={flavor}
                        className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs"
                      >
                        {flavor}
                      </span>
                    ))}
                    {item.flavors.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{item.flavors.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;
