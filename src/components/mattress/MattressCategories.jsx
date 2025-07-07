import React from 'react'
import { useMattress } from '../../hooks/useMattress'
import { mattressBrands, mattressSizes } from '../../data/mattressData'

const MattressCategories = () => {
  const {
    categories,
    selectedCategory,
    selectedBrand,
    selectedSize,
    priceRange,
    setSelectedCategory,
    setSelectedBrand,
    setSelectedSize,
    setPriceRange,
    allProducts
  } = useMattress()

  // Calcula contagem de produtos por categoria
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'Todos') return allProducts.length
    return allProducts.filter(product => product.category === categoryName).length
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {getCategoryCount(category.name)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Marcas</h3>
        <select 
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Todas">Todas as marcas</option>
          {mattressBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Sizes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Tamanhos</h3>
        <select 
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Todos">Todos os tamanhos</option>
          {mattressSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Faixa de Preço</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="R$ 0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Máximo</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="R$ 5000"
              />
            </div>
          </div>
          
          {/* Quick Price Filters */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Filtros rápidos:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPriceRange({ min: 0, max: 500 })}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                Até R$ 500
              </button>
              <button
                onClick={() => setPriceRange({ min: 500, max: 1000 })}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                R$ 500 - R$ 1.000
              </button>
              <button
                onClick={() => setPriceRange({ min: 1000, max: 2000 })}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                R$ 1.000 - R$ 2.000
              </button>
              <button
                onClick={() => setPriceRange({ min: 2000, max: 5000 })}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                Acima de R$ 2.000
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Características</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="memory-foam" className="rounded" />
            <label htmlFor="memory-foam" className="text-sm text-gray-700">Memory Foam</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pocket" className="rounded" />
            <label htmlFor="pocket" className="text-sm text-gray-700">Molas Pocket</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pillow-top" className="rounded" />
            <label htmlFor="pillow-top" className="text-sm text-gray-700">Pillow Top</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="anti-acaro" className="rounded" />
            <label htmlFor="anti-acaro" className="text-sm text-gray-700">Anti-ácaro</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="antibacteriano" className="rounded" />
            <label htmlFor="antibacteriano" className="text-sm text-gray-700">Antibacteriano</label>
          </div>
        </div>
      </div>

      {/* Firmness Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Firmeza</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input type="radio" id="macio" name="firmness" className="rounded" />
            <label htmlFor="macio" className="text-sm text-gray-700">Macio</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="medio" name="firmness" className="rounded" />
            <label htmlFor="medio" className="text-sm text-gray-700">Médio</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="medio-firme" name="firmness" className="rounded" />
            <label htmlFor="medio-firme" className="text-sm text-gray-700">Médio-Firme</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="firme" name="firmness" className="rounded" />
            <label htmlFor="firme" className="text-sm text-gray-700">Firme</label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <button 
        onClick={() => {
          setSelectedCategory('Todos')
          setSelectedBrand('Todas')
          setSelectedSize('Todos')
          setPriceRange({ min: 0, max: 5000 })
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  )
}

export default MattressCategories
