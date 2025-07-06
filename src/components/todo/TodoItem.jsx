import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2, 
  Calendar,
  Tag,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { todoFormatters } from '../../services/todoService';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityConfig = {
    high: {
      color: 'text-red-600',
      bg: 'bg-red-100',
      icon: <AlertTriangle className="w-3 h-3" />,
      label: 'Alta'
    },
    medium: {
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      icon: <Clock className="w-3 h-3" />,
      label: 'Média'
    },
    low: {
      color: 'text-green-600',
      bg: 'bg-green-100',
      icon: <Circle className="w-3 h-3" />,
      label: 'Baixa'
    }
  };

  const priority = priorityConfig[todo.priority] || priorityConfig.medium;
  const isOverdue = todoFormatters.isOverdue(todo.dueDate);
  const isCompleted = todo.completed;

  return (
    <div
      className={`p-4 hover:bg-gray-50 transition-colors ${
        isCompleted ? 'opacity-75' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layout Mobile */}
      <div className="sm:hidden space-y-3">
        <div className="flex items-start gap-3">
          <button
            onClick={onToggle}
            className="mt-1 flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${
              isCompleted 
                ? 'line-through text-gray-500' 
                : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`text-sm mt-1 ${
                isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
          </div>

          {(isHovered || window.innerWidth < 640) && (
            <div className="flex gap-1">
              <button
                onClick={onEdit}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Editar"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Deletar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-8">
          {/* Prioridade */}
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priority.color} ${priority.bg}`}>
            {priority.icon}
            {priority.label}
          </span>

          {/* Categoria */}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
            <Tag className="w-3 h-3" />
            {todo.category}
          </span>

          {/* Data de vencimento */}
          {todo.dueDate && (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isOverdue && !isCompleted
                ? 'text-red-600 bg-red-100'
                : 'text-gray-600 bg-gray-100'
            }`}>
              <Calendar className="w-3 h-3" />
              {todoFormatters.formatDate(todo.dueDate)}
              {isOverdue && !isCompleted && ' (Atrasada)'}
            </span>
          )}
        </div>

        {/* Data de criação */}
        <div className="text-xs text-gray-500 ml-8">
          Criada em {todoFormatters.formatDateTime(todo.createdAt)}
        </div>
      </div>

      {/* Layout Desktop */}
      <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
        {/* Checkbox e Título */}
        <div className="col-span-5 flex items-center gap-3">
          <button
            onClick={onToggle}
            className="flex-shrink-0"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
            )}
          </button>
          
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium truncate ${
              isCompleted 
                ? 'line-through text-gray-500' 
                : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`text-sm truncate ${
                isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>

        {/* Prioridade */}
        <div className="col-span-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priority.color} ${priority.bg}`}>
            {priority.icon}
            {priority.label}
          </span>
        </div>

        {/* Categoria */}
        <div className="col-span-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
            <Tag className="w-3 h-3" />
            <span className="truncate">{todo.category}</span>
          </span>
        </div>

        {/* Data de vencimento */}
        <div className="col-span-2">
          {todo.dueDate ? (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isOverdue && !isCompleted
                ? 'text-red-600 bg-red-100'
                : 'text-gray-600 bg-gray-100'
            }`}>
              <Calendar className="w-3 h-3" />
              <span className="truncate">
                {todoFormatters.formatDate(todo.dueDate)}
                {isOverdue && !isCompleted && ' (Atrasada)'}
              </span>
            </span>
          ) : (
            <span className="text-xs text-gray-400">Sem prazo</span>
          )}
        </div>

        {/* Ações */}
        <div className="col-span-1 flex justify-end">
          {isHovered && (
            <div className="flex gap-1">
              <button
                onClick={onEdit}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Editar"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Deletar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
