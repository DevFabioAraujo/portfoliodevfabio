import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle,
  BarChart3,
  Filter,
  Search,
  SortAsc
} from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';

const TodoApp = () => {
  const {
    todos,
    loading,
    error,
    filters,
    sortBy,
    updateFilters,
    clearFilters,
    setSortBy,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    stats,
    categories,
    setError,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Handlers
  const handleAddTodo = (todoData) => {
    const newTodo = addTodo(todoData);
    if (newTodo) {
      setShowForm(false);
    }
  };

  const handleUpdateTodo = (id, updates) => {
    const updated = updateTodo(id, updates);
    if (updated) {
      setEditingTodo(null);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setShowForm(false);
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      deleteTodo(id);
    }
  };

  const handleToggleTodo = (id) => {
    toggleTodo(id);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌ Erro</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar ao Portfólio</span>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Gerenciador de Tarefas
                </h1>
                <p className="text-gray-600 mt-1">
                  Organize suas tarefas e aumente sua produtividade
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters 
                    ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nova Tarefa
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Painel Principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<BarChart3 className="w-5 h-5" />}
                label="Total"
                value={stats.total}
                color="blue"
              />
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5" />}
                label="Concluídas"
                value={stats.completed}
                color="green"
              />
              <StatCard
                icon={<Clock className="w-5 h-5" />}
                label="Pendentes"
                value={stats.pending}
                color="yellow"
              />
              <StatCard
                icon={<AlertTriangle className="w-5 h-5" />}
                label="Alta Prioridade"
                value={stats.highPriority}
                color="red"
              />
            </div>

            {/* Filtros (se visível) */}
            {showFilters && (
              <TodoFilters
                filters={filters}
                sortBy={sortBy}
                categories={categories}
                onFiltersChange={updateFilters}
                onSortChange={setSortBy}
                onClearFilters={clearFilters}
              />
            )}

            {/* Lista de Tarefas */}
            <div className="bg-white rounded-lg shadow-sm">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando tarefas...</p>
                </div>
              ) : todos.length === 0 ? (
                <div className="p-8 text-center">
                  <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all'
                      ? 'Nenhuma tarefa encontrada com os filtros aplicados'
                      : 'Nenhuma tarefa criada ainda'
                    }
                  </p>
                  {(filters.search || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Limpar Filtros
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={() => handleToggleTodo(todo.id)}
                      onEdit={() => handleEditTodo(todo)}
                      onDelete={() => handleDeleteTodo(todo.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo Rápido
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-medium">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` 
                    }}
                  ></div>
                </div>

                {categories.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Categorias</h4>
                    <div className="space-y-1">
                      {categories.slice(0, 5).map((category) => (
                        <div key={category} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{category}</span>
                          <span className="text-gray-500">
                            {todos.filter(t => t.category === category).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Adicionar Tarefa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Formulário */}
      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
          onCancel={handleCancelEdit}
          categories={categories}
        />
      )}
    </div>
  );
};

// Componente para cards de estatísticas
const StatCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
