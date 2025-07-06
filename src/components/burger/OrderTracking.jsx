import React from 'react';
import { X, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';

const OrderTracking = ({ isOpen, onClose, order }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'preparing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cooking':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'delivering':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'preparing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cooking':
        return 'text-orange-600 bg-orange-50';
      case 'ready':
        return 'text-blue-600 bg-blue-50';
      case 'delivering':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Pedido Confirmado';
      case 'preparing':
        return 'Preparando Ingredientes';
      case 'cooking':
        return 'Cozinhando com Carinho';
      case 'ready':
        return 'Pronto para Entrega';
      case 'delivering':
        return 'Saiu para Entrega';
      case 'delivered':
        return 'Entregue';
      default:
        return 'Status Desconhecido';
    }
  };

  const statusSteps = [
    { id: 'confirmed', label: 'Confirmado', description: 'Pedido recebido e confirmado' },
    { id: 'preparing', label: 'Preparando', description: 'Separando ingredientes frescos' },
    { id: 'cooking', label: 'Cozinhando', description: 'Preparando seu hambúrguer' },
    { id: 'ready', label: 'Pronto', description: 'Pedido pronto para entrega' },
    { id: 'delivering', label: 'Entregando', description: 'A caminho do seu endereço' },
    { id: 'delivered', label: 'Entregue', description: 'Pedido entregue com sucesso' }
  ];

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return statusSteps.findIndex(step => step.id === order.status);
  };

  if (!isOpen || !order) return null;

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex flex-col max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">Acompanhar Pedido</h2>
            <p className="text-orange-100">Pedido #{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Status */}
          <div className="text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span>{getStatusText(order.status)}</span>
            </div>
            <p className="text-gray-600 mt-2">
              Tempo estimado: {order.estimatedTime} minutos
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Progresso do Pedido</h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    {/* Step Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-semibold ${
                          isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            Atual
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      
                      {/* Timeline from order */}
                      {order.timeline && order.timeline.find(t => t.status === step.id) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(order.timeline.find(t => t.status === step.id).timestamp)}
                        </p>
                      )}
                    </div>
                    
                    {/* Connecting Line */}
                    {index < statusSteps.length - 1 && (
                      <div className={`absolute left-[2.5rem] mt-10 w-0.5 h-8 ${
                        index < currentStepIndex ? 'bg-green-300' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Detalhes do Pedido</h3>
            
            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{item.image}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(order.totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="font-medium">
                  {order.totals.deliveryFee === 0 ? 'Grátis' : formatPrice(order.totals.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxa de serviço</span>
                <span className="font-medium">{formatPrice(order.totals.serviceFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-orange-600 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>{formatPrice(order.totals.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 rounded-xl p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Informações de Entrega</span>
            </h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Cliente:</span>
                <span className="ml-2 text-gray-600">{order.customer.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Telefone:</span>
                <span className="ml-2 text-gray-600">{order.customer.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Endereço:</span>
                <span className="ml-2 text-gray-600">{order.customer.address}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Pagamento:</span>
                <span className="ml-2 text-gray-600">
                  {order.payment.method === 'credit' && 'Cartão de Crédito'}
                  {order.payment.method === 'debit' && 'Cartão de Débito'}
                  {order.payment.method === 'pix' && 'PIX'}
                  {order.payment.method === 'cash' && 'Dinheiro'}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {order.timeline && order.timeline.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Histórico</h3>
              <div className="space-y-2">
                {order.timeline.slice().reverse().map((event, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(event.status)}
                      <span className="text-gray-900">{event.message}</span>
                    </div>
                    <span className="text-gray-500">{formatTime(event.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="text-center text-sm text-gray-600">
            <p>Algum problema com seu pedido?</p>
            <button className="text-orange-600 hover:text-orange-700 font-medium mt-1">
              Entre em contato conosco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
