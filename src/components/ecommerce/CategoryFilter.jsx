import React from 'react'
import { Filter } from 'lucide-react'

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Filter className="w-5 h-5 mr-2 text-blue-600" />
        Categorias
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </div>
            
            {/* Product count badge */}
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === category.name
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {category.name === 'Todos' ? '10' : getProductCount(category.name)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Helper function to get product count by category
const getProductCount = (categoryName) => {
  const counts = {
    'Eletrônicos': '4',
    'Computadores': '2',
    'Acessórios': '2',
    'Smart Home': '1',
    'Wearables': '1'
  }
  return counts[categoryName] || '0'
}

export default CategoryFilter
