import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros e ordenação
  const [filters, setFilters] = useState({
    status: 'all', // all, completed, pending
    priority: 'all', // all, high, medium, low
    category: 'all', // all, ou categoria específica
    search: '',
  });
  const [sortBy, setSortBy] = useState('created_desc');

  // Carregar tarefas do localStorage
  const loadTodos = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const loadedTodos = todoService.getTodos();
      setTodos(loadedTodos);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar nova tarefa
  const addTodo = useCallback((todoData) => {
    try {
      const newTodo = todoService.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError('Erro ao adicionar tarefa');
      console.error('Erro ao adicionar tarefa:', err);
      return null;
    }
  }, []);

  // Atualizar tarefa
  const updateTodo = useCallback((id, updates) => {
    try {
      const updatedTodo = todoService.updateTodo(id, updates);
      if (updatedTodo) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        ));
        return updatedTodo;
      }
      return null;
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar tarefa:', err);
      return null;
    }
  }, []);

  // Deletar tarefa
  const deleteTodo = useCallback((id) => {
    try {
      todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error('Erro ao deletar tarefa:', err);
      return false;
    }
  }, []);

  // Toggle status da tarefa
  const toggleTodo = useCallback((id) => {
    try {
      const updatedTodo = todoService.toggleTodo(id);
      if (updatedTodo) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        ));
        return updatedTodo;
      }
      return null;
    } catch (err) {
      setError('Erro ao alterar status da tarefa');
      console.error('Erro ao alterar status da tarefa:', err);
      return null;
    }
  }, []);

  // Aplicar filtros e ordenação
  const filteredAndSortedTodos = useCallback(() => {
    let result = todoService.filterTodos(todos, filters);
    result = todoService.sortTodos(result, sortBy);
    return result;
  }, [todos, filters, sortBy]);

  // Obter estatísticas
  const stats = useCallback(() => {
    return todoService.getStats();
  }, [todos]);

  // Obter categorias disponíveis
  const categories = useCallback(() => {
    return todoService.getCategories();
  }, [todos]);

  // Atualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      search: '',
    });
  }, []);

  // Carregar dados na inicialização
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    // Estado
    todos: filteredAndSortedTodos(),
    allTodos: todos,
    loading,
    error,
    
    // Filtros e ordenação
    filters,
    sortBy,
    updateFilters,
    clearFilters,
    setSortBy,
    
    // Ações
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    loadTodos,
    
    // Dados computados
    stats: stats(),
    categories: categories(),
    
    // Utilitários
    setError,
  };
};

// Hook para gerenciar estado do formulário
export const useTodoForm = (initialTodo = null) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'geral',
    dueDate: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Inicializar formulário com dados da tarefa (para edição)
  useEffect(() => {
    if (initialTodo) {
      setFormData({
        title: initialTodo.title || '',
        description: initialTodo.description || '',
        priority: initialTodo.priority || 'medium',
        category: initialTodo.category || 'geral',
        dueDate: initialTodo.dueDate ? initialTodo.dueDate.split('T')[0] : '',
      });
      setIsEditing(true);
    }
  }, [initialTodo]);

  // Atualizar campo do formulário
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário digita
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  // Validar formulário
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Título deve ter pelo menos 3 caracteres';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'Data de vencimento não pode ser no passado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Resetar formulário
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'geral',
      dueDate: '',
    });
    setErrors({});
    setIsEditing(false);
  }, []);

  // Obter dados formatados para submissão
  const getSubmissionData = useCallback(() => {
    return {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim() || 'geral',
      dueDate: formData.dueDate || null,
    };
  }, [formData]);

  return {
    formData,
    isEditing,
    errors,
    updateField,
    validateForm,
    resetForm,
    getSubmissionData,
    setFormData,
  };
};
