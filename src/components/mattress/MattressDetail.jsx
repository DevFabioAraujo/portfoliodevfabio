import React, { useState } from 'react'
import { ArrowLeft, Star, Heart, ShoppingCart, Shield, Truck, CreditCard, Info } from 'lucide-react'

const MattressDetail = ({ product, onBack, onAddToCart, onAddToFavorites, isFavorite }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const images = [product.image, product.image, product.image] // Simulating multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      const success = onAddToCart(product)
      if (!success) {
        alert('Quantidade indisponível em estoque!')
        break
      }
    }
  }

  const handleAddToFavorites = () => {
    onAddToFavorites(product)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={onBack} className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
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
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
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
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
              <button
                onClick={handleAddToFavorites}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
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
                <span className="text-lg font-medium text-gray-900 ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} avaliações)</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-6">
            {product.originalPrice && (
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-lg text-gray-500 line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                  -{product.discount}% OFF
                </span>
              </div>
            )}
            <div className="text-4xl font-bold text-gray-900 mb-2">
              R$ {product.price.toFixed(2)}
            </div>
            {product.installments && (
              <p className="text-gray-600">
                ou <span className="font-medium">{product.installments.count}x de R$ {product.installments.value.toFixed(2)}</span> sem juros
              </p>
            )}
            <p className="text-green-600 font-medium mt-2">
              💳 10% de desconto no PIX
            </p>
          </div>

          {/* Product Specifications */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Tamanho</h3>
              <p className="text-gray-600">{product.size}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Espessura</h3>
              <p className="text-gray-600">{product.thickness}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Firmeza</h3>
              <p className="text-gray-600">{product.firmness}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Material</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Características</h3>
            <div className="flex flex-wrap gap-2">
              {product.features.map((feature, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className={`font-medium ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 
                ? product.stock > 10 
                  ? 'Em estoque' 
                  : `Últimas ${product.stock} unidades`
                : 'Fora de estoque'
              }
            </span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-900">Quantidade:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                product.stock === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{product.stock === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}</span>
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Frete Grátis</p>
                <p className="text-sm text-gray-600">Para todo Brasil</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Garantia</p>
                <p className="text-sm text-gray-600">{product.warranty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Parcelamento</p>
                <p className="text-sm text-gray-600">Até 18x sem juros</p>
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
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Este colchão foi desenvolvido com tecnologia avançada para proporcionar o máximo conforto e suporte durante o sono. 
              Ideal para quem busca qualidade de vida e bem-estar através de uma boa noite de descanso.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefícios:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Alívio de pontos de pressão</li>
              <li>Suporte adequado para a coluna</li>
              <li>Regulação da temperatura corporal</li>
              <li>Redução de movimentos durante o sono</li>
              <li>Material hipoalergênico e antibacteriano</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {/* Care Instructions */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Cuidados</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Vire o colchão a cada 3 meses</li>
              <li>• Use protetor impermeável</li>
              <li>• Mantenha em local arejado</li>
              <li>• Evite dobrar ou enrolar</li>
              <li>• Aspire regularmente</li>
            </ul>
          </div>

          {/* Warranty Info */}
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Garantia</h3>
            </div>
            <p className="text-sm text-green-800 mb-3">
              <strong>{product.warranty}</strong> de garantia contra defeitos de fabricação.
            </p>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Cobertura total</li>
              <li>• Troca gratuita</li>
              <li>• Suporte técnico</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MattressDetail
