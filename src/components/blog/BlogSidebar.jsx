import React from 'react'
import { TrendingUp, Calendar, Tag, User, Clock } from 'lucide-react'

const BlogSidebar = ({ posts, categories, onPostSelect }) => {
  // Get recent posts (last 5)
  const recentPosts = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  // Get popular posts (by views - simulated)
  const popularPosts = posts
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)

  // Get category counts
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = posts.filter(post => post.category === category).length
    return acc
  }, {})

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short'
    })
  }

  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    return Math.ceil(words / wordsPerMinute)
  }

  return (
    <div className="space-y-8">
      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">FA</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Fabio Ferreira</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Desenvolvedor Full Stack compartilhando conhecimento sobre tecnologia, 
            desenvolvimento web e as últimas tendências em TI.
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Artigos Recentes
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <article 
              key={post.id}
              onClick={() => onPostSelect(post)}
              className="cursor-pointer group"
            >
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">{post.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{getReadingTime(post.content)} min</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Mais Populares
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <article 
              key={post.id}
              onClick={() => onPostSelect(post)}
              className="cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <span>{post.views || Math.floor(Math.random() * 1000) + 100} visualizações</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-purple-600" />
          Categorias
        </h3>
        <div className="space-y-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div 
              key={category}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="text-gray-700 font-medium">{category}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">📧 Newsletter</h3>
        <p className="text-blue-100 text-sm mb-4">
          Receba os melhores artigos sobre tecnologia diretamente no seu email.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Seu melhor email"
            className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Inscrever-se
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Estatísticas</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total de artigos</span>
            <span className="font-bold text-blue-600">{posts.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Categorias</span>
            <span className="font-bold text-purple-600">{categories.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Visualizações totais</span>
            <span className="font-bold text-green-600">
              {posts.reduce((acc, post) => acc + (post.views || Math.floor(Math.random() * 1000) + 100), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 Conecte-se</h3>
        <div className="space-y-3">
          <a 
            href="https://github.com/DevFabioAraujo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🐙</span>
            </div>
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/fabioferreira" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">💼</span>
            </div>
            <span>LinkedIn</span>
          </a>
          <a 
            href="mailto:fabio@email.com" 
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">📧</span>
            </div>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
