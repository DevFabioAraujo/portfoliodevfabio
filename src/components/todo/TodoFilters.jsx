import React from 'react';
import { Search, Filter, X, SortAsc } from 'lucide-react';

const TodoFilters = ({ 
  filters, 
  sortBy, 
  categories, 
  onFiltersChange, 
  onSortChange, 
  onClearFilters 
}) => {
  const handleSearchChange = (e) => {
    onFiltersChange({ search: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFiltersChange({ status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onFiltersChange({ priority: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onFiltersChange({ category: e.target.value });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.category !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Filtros e Ordenação</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Busca */}
        <div className="lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Buscar por título, descrição ou categoria..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        {/* Prioridade */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridade
          </label>
          <select
            id="priority"
            value={filters.priority}
            onChange={handlePriorityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>

        {/* Categoria */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ordenação */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-600" />
            <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
              Ordenar por:
            </label>
          </div>
          
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="created_desc">Mais recentes</option>
            <option value="created_asc">Mais antigas</option>
            <option value="title_asc">Título (A-Z)</option>
            <option value="title_desc">Título (Z-A)</option>
            <option value="priority">Prioridade</option>
            <option value="due_date">Data de vencimento</option>
          </select>
        </div>
      </div>

      {/* Resumo dos filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Filtros ativos:</span>
            
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Busca: "{filters.search}"
                <button
                  onClick={() => onFiltersChange({ search: '' })}
                  className="hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Status: {filters.status === 'completed' ? 'Concluídas' : 'Pendentes'}
                <button
                  onClick={() => onFiltersChange({ status: 'all' })}
                  className="hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.priority !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Prioridade: {filters.priority === 'high' ? 'Alta' : filters.priority === 'medium' ? 'Média' : 'Baixa'}
                <button
                  onClick={() => onFiltersChange({ priority: 'all' })}
                  className="hover:text-yellow-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Categoria: {filters.category}
                <button
                  onClick={() => onFiltersChange({ category: 'all' })}
                  className="hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilters;
