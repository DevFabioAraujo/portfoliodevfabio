import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X, Bell } from 'lucide-react';

const NotificationToast = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      if (onDismiss) {
        onDismiss(notification.id);
      }
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'order':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'order':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'info':
        return 'text-blue-800';
      case 'order':
        return 'text-purple-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
        }
      `}
    >
      <div
        className={`
          max-w-sm w-full bg-white shadow-lg rounded-lg border-l-4 overflow-hidden
          ${getBackgroundColor()}
        `}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className={`text-sm font-medium ${getTextColor()}`}>
                {notification.title}
              </p>
              {notification.message && (
                <p className={`mt-1 text-sm ${getTextColor()} opacity-90`}>
                  {notification.message}
                </p>
              )}
              {notification.timestamp && (
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={handleDismiss}
                className={`
                  inline-flex text-gray-400 hover:text-gray-600 
                  focus:outline-none focus:text-gray-600 transition-colors
                `}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className={`
              h-full transition-all duration-5000 ease-linear
              ${notification.type === 'success' && 'bg-green-500'}
              ${notification.type === 'error' && 'bg-red-500'}
              ${notification.type === 'info' && 'bg-blue-500'}
              ${notification.type === 'order' && 'bg-purple-500'}
              ${!notification.type && 'bg-gray-500'}
              ${isVisible ? 'w-0' : 'w-full'}
            `}
            style={{
              animation: isVisible ? 'shrink 5s linear forwards' : 'none'
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default NotificationToast;
