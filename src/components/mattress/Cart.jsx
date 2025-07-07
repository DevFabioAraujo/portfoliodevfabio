import React from 'react'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

const Cart = ({ cart, onBack, onUpdateQuantity, onRemoveItem, totalPrice }) => {
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId)
    } else {
      onUpdateQuantity(productId, newQuantity)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button onClick={onBack} className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Showroom</span>
          </button>
        </div>

        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">
            Adicione alguns produtos incríveis ao seu carrinho para continuar
          </p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Showroom</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Carrinho de Compras</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total de itens</p>
          <p className="text-2xl font-bold text-gray-900">{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.brand} • {item.size}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      {/* Stock Warning */}
                      {item.quantity >= item.stock && (
                        <p className="text-sm text-orange-600 font-medium">
                          ⚠️ Quantidade máxima disponível
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Quantidade:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
            
            {/* Order Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Frete</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Desconto PIX (10%)</span>
                <span className="font-medium text-green-600">
                  -{formatPrice(totalPrice * 0.1)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  ou {formatPrice(totalPrice * 0.9)} no PIX
                </p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-gray-900">Formas de Pagamento</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="pix" name="payment" className="text-blue-600" defaultChecked />
                  <label htmlFor="pix" className="text-sm text-gray-700">PIX (10% desconto)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="card" name="payment" className="text-blue-600" />
                  <label htmlFor="card" className="text-sm text-gray-700">Cartão até 18x sem juros</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="boleto" name="payment" className="text-blue-600" />
                  <label htmlFor="boleto" className="text-sm text-gray-700">Boleto bancário</label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Finalizar Compra
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>🔒</span>
                <span>Compra 100% segura e protegida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Vantagens da Sleep House</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">🚚</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Frete Grátis</h4>
            <p className="text-sm text-gray-600">Para todo o Brasil em compras acima de R$ 299</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">🛡️</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Garantia Estendida</h4>
            <p className="text-sm text-gray-600">Até 15 anos de garantia em produtos selecionados</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">💳</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Parcelamento</h4>
            <p className="text-sm text-gray-600">Até 18x sem juros no cartão de crédito</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
