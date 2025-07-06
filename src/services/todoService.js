// Serviço para gerenciar persistência de tarefas no localStorage
export const todoService = {
  // Chave para localStorage
  STORAGE_KEY: 'portfolio-todos',

  // Carregar todas as tarefas
  getTodos: () => {
    try {
      const todos = localStorage.getItem(todoService.STORAGE_KEY);
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      return [];
    }
  },

  // Salvar todas as tarefas
  saveTodos: (todos) => {
    try {
      localStorage.setItem(todoService.STORAGE_KEY, JSON.stringify(todos));
      return true;
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
      return false;
    }
  },

  // Gerar ID único
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Criar nova tarefa
  createTodo: (todoData) => {
    const newTodo = {
      id: todoService.generateId(),
      title: todoData.title.trim(),
      description: todoData.description?.trim() || '',
      completed: false,
      priority: todoData.priority || 'medium',
      category: todoData.category?.trim() || 'geral',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: todoData.dueDate || null,
    };

    const todos = todoService.getTodos();
    todos.unshift(newTodo); // Adiciona no início
    todoService.saveTodos(todos);
    return newTodo;
  },

  // Atualizar tarefa
  updateTodo: (id, updates) => {
    const todos = todoService.getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      todos[index] = {
        ...todos[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      todoService.saveTodos(todos);
      return todos[index];
    }
    return null;
  },

  // Deletar tarefa
  deleteTodo: (id) => {
    const todos = todoService.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    todoService.saveTodos(filteredTodos);
    return filteredTodos;
  },

  // Toggle status da tarefa
  toggleTodo: (id) => {
    const todos = todoService.getTodos();
    const todo = todos.find(t => t.id === id);
    
    if (todo) {
      return todoService.updateTodo(id, { completed: !todo.completed });
    }
    return null;
  },

  // Obter estatísticas
  getStats: () => {
    const todos = todoService.getTodos();
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      highPriority: todos.filter(t => t.priority === 'high' && !t.completed).length,
    };
  },

  // Obter categorias únicas
  getCategories: () => {
    const todos = todoService.getTodos();
    const categories = [...new Set(todos.map(t => t.category))];
    return categories.filter(Boolean);
  },

  // Filtrar tarefas
  filterTodos: (todos, filters) => {
    let filtered = [...todos];

    // Filtro por status
    if (filters.status === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (filters.status === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    }

    // Filtro por prioridade
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(t => t.priority === filters.priority);
    }

    // Filtro por categoria
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Filtro por busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm) ||
        t.category.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  },

  // Ordenar tarefas
  sortTodos: (todos, sortBy) => {
    const sorted = [...todos];

    switch (sortBy) {
      case 'title_asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title_desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'created_asc':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'created_desc':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      }
      case 'due_date':
        return sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      default:
        return sorted;
    }
  },
};

// Utilitários para formatação
export const todoFormatters = {
  formatDate: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  },

  formatDateTime: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  },

  getPriorityColor: (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  },

  getPriorityLabel: (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Média';
    }
  },

  isOverdue: (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  },
};
