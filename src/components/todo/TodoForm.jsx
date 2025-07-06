import React, { useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { useTodoForm } from '../../hooks/useTodos';

const TodoForm = ({ todo, onSubmit, onCancel, categories }) => {
  const {
    formData,
    isEditing,
    errors,
    updateField,
    validateForm,
    resetForm,
    getSubmissionData,
  } = useTodoForm(todo);

  // Reset form when todo changes
  useEffect(() => {
    if (!todo) {
      resetForm();
    }
  }, [todo, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = getSubmissionData();
      
      if (isEditing) {
        onSubmit(todo.id, submissionData);
      } else {
        onSubmit(submissionData);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Digite o título da tarefa..."
              autoFocus
            />
            {errors.title && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Adicione uma descrição (opcional)..."
            />
            {errors.description && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 caracteres
            </div>
          </div>

          {/* Prioridade e Categoria */}
          <div className="grid grid-cols-2 gap-4">
            {/* Prioridade */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => updateField('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="category"
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: trabalho, pessoal..."
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Data de Vencimento */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Vencimento
            </label>
            <input
              type="date"
              id="dueDate"
              value={formData.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dueDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && (
              <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.dueDate}
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isEditing ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
