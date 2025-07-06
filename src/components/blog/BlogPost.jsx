import React from 'react'
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Heart, MessageCircle } from 'lucide-react'

const BlogPost = ({ post, onBack, formatDate, getReadingTime }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar aos Artigos</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8">
          <div className="text-white text-6xl md:text-8xl">
            {post.icon}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {getReadingTime(post.content)} min de leitura
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-gray-600 mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-6 italic">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            {post.content.split('\n\n').map((paragraph, index) => {
              // Handle different content types
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                )
              } else if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                )
              } else if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```/g, '').trim()
                return (
                  <div key={index} className="my-6">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                )
              } else if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').filter(item => item.startsWith('- '))
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                )
              } else {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                )
              }
            })}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Tags */}
          {post.tags && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Curtir</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Comentar</span>
              </button>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </footer>

        {/* Author Bio */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">FA</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fabio Ferreira de Araujo</h3>
              <p className="text-gray-600 leading-relaxed">
                Desenvolvedor Full Stack apaixonado por tecnologia e inovação. 
                Especialista em React, Node.js e arquiteturas modernas. 
                Compartilho conhecimento através de artigos técnicos e projetos open source.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost
