import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { ingredients } from '../../data/burgerData';

const BurgerCustomizer = ({ isOpen, onClose, item, onAddToCart }) => {
  const [customizations, setCustomizations] = useState({
    bread: null,
    meat: null,
    cheese: null,
    vegetables: [],
    sauces: []
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (item) {
      // Reset customizations when item changes
      setCustomizations({
        bread: ingredients.breads[0], // Default bread
        meat: ingredients.meats[0], // Default meat
        cheese: null,
        vegetables: [],
        sauces: []
      });
    }
  }, [item]);

  useEffect(() => {
    // Calculate total price
    let price = item?.price || 0;
    
    if (customizations.bread) price += customizations.bread.price;
    if (customizations.meat) price += customizations.meat.price;
    if (customizations.cheese) price += customizations.cheese.price;
    
    customizations.vegetables.forEach(veg => {
      price += veg.price;
    });
    
    customizations.sauces.forEach(sauce => {
      price += sauce.price;
    });
    
    setTotalPrice(price);
  }, [customizations, item]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleSingleSelection = (category, selectedItem) => {
    setCustomizations(prev => ({
      ...prev,
      [category]: selectedItem
    }));
  };

  const handleMultipleSelection = (category, item) => {
    setCustomizations(prev => {
      const currentItems = prev[category] || [];
      const isSelected = currentItems.some(selected => selected.id === item.id);
      
      if (isSelected) {
        return {
          ...prev,
          [category]: currentItems.filter(selected => selected.id !== item.id)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentItems, item]
        };
      }
    });
  };

  const handleAddToCart = () => {
    if (!item) return;
    
    onAddToCart(item, customizations);
    onClose();
  };

  const isItemSelected = (category, item) => {
    if (category === 'vegetables' || category === 'sauces') {
      return customizations[category].some(selected => selected.id === item.id);
    }
    return customizations[category]?.id === item.id;
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex flex-col max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Personalize seu Hambúrguer</h2>
            <p className="text-orange-100">Monte o hambúrguer perfeito para você</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left Column - Customization Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bread Selection */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🍞 Escolha o Pão
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.breads.map((bread) => (
                    <button
                      key={bread.id}
                      onClick={() => handleSingleSelection('bread', bread)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isItemSelected('bread', bread)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{bread.image}</span>
                            <span className="font-medium">{bread.name}</span>
                          </div>
                          {bread.price > 0 && (
                            <span className="text-sm text-orange-600 font-medium">
                              +{formatPrice(bread.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meat Selection */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🥩 Escolha a Proteína
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.meats.map((meat) => (
                    <button
                      key={meat.id}
                      onClick={() => handleSingleSelection('meat', meat)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isItemSelected('meat', meat)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{meat.image}</span>
                            <span className="font-medium">{meat.name}</span>
                          </div>
                          <span className="text-sm text-orange-600 font-medium">
                            +{formatPrice(meat.price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cheese Selection */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🧀 Adicione Queijo (Opcional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSingleSelection('cheese', null)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      !customizations.cheese
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">Sem queijo</span>
                  </button>
                  {ingredients.cheeses.map((cheese) => (
                    <button
                      key={cheese.id}
                      onClick={() => handleSingleSelection('cheese', cheese)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isItemSelected('cheese', cheese)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{cheese.image}</span>
                            <span className="font-medium">{cheese.name}</span>
                          </div>
                          <span className="text-sm text-orange-600 font-medium">
                            +{formatPrice(cheese.price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vegetables Selection */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🥬 Adicione Vegetais e Extras
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.vegetables.map((vegetable) => (
                    <button
                      key={vegetable.id}
                      onClick={() => handleMultipleSelection('vegetables', vegetable)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isItemSelected('vegetables', vegetable)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{vegetable.image}</span>
                            <span className="font-medium">{vegetable.name}</span>
                          </div>
                          {vegetable.price > 0 && (
                            <span className="text-sm text-orange-600 font-medium">
                              +{formatPrice(vegetable.price)}
                            </span>
                          )}
                        </div>
                        {isItemSelected('vegetables', vegetable) && (
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sauces Selection */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🥄 Escolha os Molhos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ingredients.sauces.map((sauce) => (
                    <button
                      key={sauce.id}
                      onClick={() => handleMultipleSelection('sauces', sauce)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isItemSelected('sauces', sauce)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{sauce.image}</span>
                            <span className="font-medium">{sauce.name}</span>
                          </div>
                          {sauce.price > 0 && (
                            <span className="text-sm text-orange-600 font-medium">
                              +{formatPrice(sauce.price)}
                            </span>
                          )}
                        </div>
                        {isItemSelected('sauces', sauce) && (
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Preview and Summary */}
            <div className="space-y-6">
              {/* Burger Preview */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seu Hambúrguer
                </h3>
                
                {/* Visual Preview */}
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">🍔</div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">
                    {item.name} Personalizado
                  </h4>
                </div>

                {/* Ingredients Summary */}
                <div className="space-y-3 mb-6">
                  {customizations.bread && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{customizations.bread.image}</span>
                        <span>{customizations.bread.name}</span>
                      </span>
                      {customizations.bread.price > 0 && (
                        <span className="text-orange-600 font-medium">
                          +{formatPrice(customizations.bread.price)}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {customizations.meat && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{customizations.meat.image}</span>
                        <span>{customizations.meat.name}</span>
                      </span>
                      <span className="text-orange-600 font-medium">
                        +{formatPrice(customizations.meat.price)}
                      </span>
                    </div>
                  )}
                  
                  {customizations.cheese && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{customizations.cheese.image}</span>
                        <span>{customizations.cheese.name}</span>
                      </span>
                      <span className="text-orange-600 font-medium">
                        +{formatPrice(customizations.cheese.price)}
                      </span>
                    </div>
                  )}
                  
                  {customizations.vegetables.map((vegetable) => (
                    <div key={vegetable.id} className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{vegetable.image}</span>
                        <span>{vegetable.name}</span>
                      </span>
                      {vegetable.price > 0 && (
                        <span className="text-orange-600 font-medium">
                          +{formatPrice(vegetable.price)}
                        </span>
                      )}
                    </div>
                  ))}
                  
                  {customizations.sauces.map((sauce) => (
                    <div key={sauce.id} className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <span>{sauce.image}</span>
                        <span>{sauce.name}</span>
                      </span>
                      {sauce.price > 0 && (
                        <span className="text-orange-600 font-medium">
                          +{formatPrice(sauce.price)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hambúrguer base</span>
                    <span className="font-medium">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Personalizações</span>
                    <span className="font-medium">{formatPrice(totalPrice - item.price)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-orange-600 border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerCustomizer;
