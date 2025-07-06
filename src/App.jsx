import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CryptoDashboard from './components/crypto/CryptoDashboard'
import TodoApp from './components/todo/TodoApp'
import CalculatorApp from './components/calculator/CalculatorApp'
import BlogApp from './components/blog/BlogApp'
import EcommerceApp from './components/ecommerce/EcommerceApp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto-dashboard" element={<CryptoDashboard />} />
        <Route path="/todo-app" element={<TodoApp />} />
        <Route path="/calculator" element={<CalculatorApp />} />
        <Route path="/blog" element={<BlogApp />} />
        <Route path="/ecommerce" element={<EcommerceApp />} />
      </Routes>
    </Router>
  )
}

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">FA</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                <span className="hidden sm:inline">Fabio Ferreira</span>
                <span className="sm:hidden">Fabio</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-600 transition-colors">Habilidades</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors">Projetos</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <a
                  href="#about"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sobre
                </a>
                <a
                  href="#skills"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Habilidades
                </a>
                <a
                  href="#projects"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Projetos
                </a>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Contato
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Olá, eu sou <span className="text-yellow-300 block sm:inline">Fabio Ferreira de Araujo</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-4xl mx-auto">
            Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis
          </p>
          <Link 
            to="#projects"
            className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-sm sm:text-base inline-block"
          >
            Ver Meus Projetos
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre Mim</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sou Fabio Ferreira de Araujo, desenvolvedor apaixonado por tecnologia e inovação. 
              Com experiência em desenvolvimento web moderno, dedico-me a criar soluções eficientes 
              e interfaces intuitivas que proporcionam excelente experiência ao usuário.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Minhas Habilidades</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python', 'Git', 'Tailwind CSS', 'Vite'].map((skill) => (
              <div key={skill} className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-2">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meus Projetos</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
            {/* Dashboard de Criptomoedas */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <div className="text-white text-4xl">₿</div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Dashboard de Criptomoedas</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Dashboard interativo para acompanhar preços e tendências do mercado de criptomoedas em tempo real com gráficos e análises.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/crypto-dashboard"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Ver Demo
                  </Link>
                  <a 
                    href="https://github.com/fabioferreira/crypto-dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Código
                  </a>
                </div>
              </div>
            </div>

            {/* Gerenciador de Tarefas */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-4xl">✓</div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Gerenciador de Tarefas</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Aplicação completa para gerenciar tarefas com filtros, categorias, prioridades e persistência local.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/todo-app"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Ver Demo
                  </Link>
                  <a 
                    href="https://github.com/fabioferreira/todo-app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Código
                  </a>
                </div>
              </div>
            </div>

            {/* Calculadora Avançada */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-4xl">🧮</div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Calculadora Avançada</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Calculadora científica e financeira com funções avançadas, histórico de cálculos e modo científico completo.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/calculator"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Ver Demo
                  </Link>
                  <a 
                    href="https://github.com/fabioferreira/calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Código
                  </a>
                </div>
              </div>
            </div>

            {/* Blog TI */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <div className="text-white text-4xl">📝</div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Blog TI</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Blog completo sobre tecnologia com artigos sobre desenvolvimento, tendências e tutoriais práticos para desenvolvedores.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/blog"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Ver Demo
                  </Link>
                  <a 
                    href="https://github.com/fabioferreira/blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Código
                  </a>
                </div>
              </div>
            </div>

            {/* E-commerce */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 sm:h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-4xl">🛒</div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">TechStore</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  E-commerce completo com carrinho, checkout, favoritos, filtros avançados e sistema de pagamento integrado.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link 
                    to="/ecommerce"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Ver Demo
                  </Link>
                  <a 
                    href="https://github.com/fabioferreira/ecommerce" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Código
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">Vamos Trabalhar Juntos?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Olá! Sou Fabio Ferreira de Araujo e estou sempre aberto a novas oportunidades e projetos desafiadores.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              📧 Email
            </button>
            <button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              💼 LinkedIn
            </button>
            <button className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base">
              🐙 GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 Fabio Ferreira de Araujo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
