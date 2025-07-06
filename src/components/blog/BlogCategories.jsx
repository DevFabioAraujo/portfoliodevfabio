import React from 'react'
import { Filter, X } from 'lucide-react'

const BlogCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  const categoryIcons = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'DevOps': '🚀',
    'Mobile': '📱',
    'AI/ML': '🤖',
    'Web3': '🔗',
    'Tutorial': '📚',
    'Carreira': '💼',
    'Ferramentas': '🛠️',
    'Tendências': '📈'
  }

  const categoryColors = {
    'Frontend': 'bg-blue-100 text-blue-800 border-blue-200',
    'Backend': 'bg-green-100 text-green-800 border-green-200',
    'DevOps': 'bg-purple-100 text-purple-800 border-purple-200',
    'Mobile': 'bg-pink-100 text-pink-800 border-pink-200',
    'AI/ML': 'bg-orange-100 text-orange-800 border-orange-200',
    'Web3': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Tutorial': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Carreira': 'bg-red-100 text-red-800 border-red-200',
    'Ferramentas': 'bg-gray-100 text-gray-800 border-gray-200',
    'Tendências': 'bg-teal-100 text-teal-800 border-teal-200'
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          Filtrar por Categoria
        </h2>
        
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory('')}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpar filtro</span>
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory('')}
          className={`
            flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200
            ${!selectedCategory 
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
            }
          `}
        >
          <span className="text-lg">🌟</span>
          <span className="font-medium text-sm">Todos</span>
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200
              ${selectedCategory === category
                ? `${categoryColors[category]} shadow-lg transform scale-105 border-current`
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            <span className="text-lg">{categoryIcons[category] || '📝'}</span>
            <span className="font-medium text-sm">{category}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Info */}
      {selectedCategory && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{categoryIcons[selectedCategory] || '📝'}</span>
            <div>
              <h3 className="font-semibold text-blue-900">
                Categoria: {selectedCategory}
              </h3>
              <p className="text-blue-700 text-sm">
                {getCategoryDescription(selectedCategory)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to get category descriptions
const getCategoryDescription = (category) => {
  const descriptions = {
    'Frontend': 'Artigos sobre desenvolvimento de interfaces, React, Vue, CSS e UX/UI',
    'Backend': 'Conteúdo sobre APIs, bancos de dados, Node.js, Python e arquitetura de sistemas',
    'DevOps': 'Tutoriais sobre CI/CD, Docker, Kubernetes, AWS e automação de infraestrutura',
    'Mobile': 'Desenvolvimento para iOS, Android, React Native e Flutter',
    'AI/ML': 'Inteligência Artificial, Machine Learning, Deep Learning e Data Science',
    'Web3': 'Blockchain, criptomoedas, NFTs e tecnologias descentralizadas',
    'Tutorial': 'Guias passo a passo e tutoriais práticos para desenvolvedores',
    'Carreira': 'Dicas de carreira, entrevistas técnicas e crescimento profissional',
    'Ferramentas': 'Reviews e tutoriais de ferramentas de desenvolvimento',
    'Tendências': 'Últimas tendências e novidades do mundo da tecnologia'
  }
  
  return descriptions[category] || 'Artigos relacionados a esta categoria'
}

export default BlogCategories
