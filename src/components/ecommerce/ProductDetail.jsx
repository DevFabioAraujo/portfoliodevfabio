import React, { useState } from 'react'
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from 'lucide-react'

const ProductDetail = ({ product, onBack, onAddToCart, onAddToFavorites, isFavorite }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  if (!product) return null

  const images = product.images || [product.image]
  const sizes = product.sizes || []
  const colors = product.colors || []

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      selectedSize,
      selectedColor
    }
    onAddToCart(productToAdd)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-lg font-medium text-gray-900 ml-2">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-600">
                ({product.reviews} avaliações)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center space-x-4 mb-2">
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                R$ {product.price.toFixed(2)}
              </span>
              {product.discount && (
                <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full font-medium">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            
            {product.installments && (
              <p className="text-gray-600">
                ou {product.installments.count}x de R$ {product.installments.value.toFixed(2)} sem juros
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-6">
            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Cor</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantidade</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.stock} disponível(is)
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Adicionar ao Carrinho</span>
              </button>
              
              <button
                onClick={() => onAddToFavorites(product)}
                className={`p-3 border rounded-lg transition-colors ${
                  isFavorite
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              
              <button className="p-3 border border-gray-300 text-gray-600 hover:border-gray-400 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Comprar Agora
            </button>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Frete Grátis</p>
                  <p className="text-sm text-gray-600">Acima de R$ 99</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Garantia</p>
                  <p className="text-sm text-gray-600">12 meses</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Troca Fácil</p>
                  <p className="text-sm text-gray-600">30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrição do Produto</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description || `
                Este produto oferece qualidade excepcional e design moderno. 
                Desenvolvido com materiais premium e tecnologia avançada, 
                garantindo durabilidade e performance superior. 
                
                Características principais:
                • Design ergonômico e moderno
                • Materiais de alta qualidade
                • Tecnologia avançada
                • Garantia de 12 meses
                • Suporte técnico especializado
                
                Ideal para uso diário, este produto combina funcionalidade 
                e estilo, atendendo às necessidades dos usuários mais exigentes.
              `}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Especificações</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-600">Marca:</dt>
                <dd className="font-medium text-gray-900">{product.brand || 'TechStore'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Modelo:</dt>
                <dd className="font-medium text-gray-900">{product.model || 'Premium'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Garantia:</dt>
                <dd className="font-medium text-gray-900">12 meses</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Peso:</dt>
                <dd className="font-medium text-gray-900">{product.weight || '1.2kg'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
