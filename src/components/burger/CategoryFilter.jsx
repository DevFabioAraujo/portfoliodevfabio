import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const allCategory = {
    id: 'all',
    name: 'Todos',
    icon: '🍽️',
    color: 'from-gray-500 to-gray-600'
  };

  const allCategories = [allCategory, ...categories];

  return (
    <div className="flex flex-wrap gap-3">
      {allCategories.map((category) => {
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200
              ${isSelected
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm font-semibold">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
