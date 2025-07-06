# Portfolio Dev Fabio Araujo

Portfólio pessoal desenvolvido por Fabio Ferreira de Araujo, showcasing projetos e habilidades em desenvolvimento web.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **Axios** - Cliente HTTP para requisições
- **Recharts** - Biblioteca de gráficos para React
- **Lucide React** - Ícones modernos

## 📱 Projetos Incluídos

### 1. Dashboard de Criptomoedas
- Acompanhamento de preços em tempo real
- Gráficos interativos com Recharts
- Interface responsiva e moderna
- Integração com API de criptomoedas

### 2. Gerenciador de Tarefas (Todo App)
- ✅ **Criação e edição de tarefas** com título, descrição, prioridade e categoria
- 📊 **Dashboard com estatísticas** em tempo real (total, concluídas, pendentes, alta prioridade)
- 🔍 **Sistema de filtros avançado** por status, prioridade, categoria e busca textual
- 📈 **Barra de progresso** dinâmica baseada nas tarefas concluídas
- 🏷️ **Categorização automática** com contadores no painel lateral
- 📅 **Ordenação flexível** por data, prioridade ou status
- 💾 **Persistência local** com localStorage
- 🎨 **Interface moderna** com Tailwind CSS e ícones Lucide
- 📱 **Design responsivo** para todos os dispositivos

### 3. Calculadora Avançada
- 🧮 **Modo Básico e Científico** - Alternância entre calculadora simples e científica
- 🔢 **Operações básicas** - Adição, subtração, multiplicação, divisão, porcentagem
- 📐 **Funções trigonométricas** - sin, cos, tan (em graus)
- 📊 **Funções logarítmicas** - ln (logaritmo natural), log (base 10)
- ⚡ **Potências e raízes** - x², x³, xʸ, √, ∛
- 🔢 **Constantes matemáticas** - π (pi), e (euler)
- 🧠 **Funções especiais** - fatorial (!), inverso (1/x), mudança de sinal (±)
- 💾 **Sistema de memória** - MC, MR, M+, M- para armazenar valores
- 📜 **Histórico completo** - Registro de todos os cálculos com timestamp
- 📊 **Estatísticas** - Total de cálculos realizados e último resultado
- 🎨 **Interface moderna** - Design glassmorphism com gradientes
- 📱 **Layout responsivo** - Funciona perfeitamente em desktop e mobile

### 4. Blog TI
- 📝 **Sistema de artigos completo** - Criação, visualização e navegação de posts
- 🔍 **Busca avançada** - Pesquisa por título, conteúdo, tags e categorias
- 🏷️ **Sistema de categorias** - Frontend, Backend, DevOps, Mobile, AI/ML, Web3, etc.
- 📊 **Filtros inteligentes** - Combinação de busca textual e filtros por categoria
- 📖 **Visualização de artigos** - Layout otimizado para leitura com syntax highlighting
- 👤 **Perfil do autor** - Informações e bio do desenvolvedor
- 📈 **Estatísticas** - Contadores de artigos, visualizações e métricas
- 🔗 **Compartilhamento social** - Funcionalidade de compartilhar artigos
- 📱 **Design responsivo** - Interface adaptável para todos os dispositivos
- 🎨 **UI moderna** - Design clean com gradientes e componentes elegantes
- 📧 **Newsletter** - Sistema de inscrição para receber atualizações
- 🏆 **Ranking de popularidade** - Artigos mais visualizados e recentes

## 🛠️ Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/DevFabioAraujo/portfoliodevfabio.git
```

2. Navegue até o diretório do projeto:
```bash
cd portfoliodevfabio/portfolio
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm run dev
```

5. Abra no navegador:
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
portfolio/
├── src/
│   ├── components/
│   │   ├── crypto/
│   │   │   ├── CryptoDashboard.jsx
│   │   │   └── CryptoChart.jsx
│   │   ├── todo/
│   │   │   ├── TodoApp.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoFilters.jsx
│   │   ├── calculator/
│   │   │   ├── CalculatorApp.jsx
│   │   │   ├── CalculatorDisplay.jsx
│   │   │   ├── CalculatorButtons.jsx
│   │   │   └── CalculatorHistory.jsx
│   │   └── blog/
│   │       ├── BlogApp.jsx
│   │       ├── BlogPost.jsx
│   │       ├── BlogSidebar.jsx
│   │       └── BlogCategories.jsx
│   ├── hooks/
│   │   ├── useCrypto.js
│   │   ├── useTodos.js
│   │   ├── useCalculator.js
│   │   └── useBlog.js
│   ├── services/
│   │   ├── cryptoAPI.js
│   │   └── todoService.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

## 🎯 Funcionalidades

### Gerais
- ✅ Design responsivo e moderno
- ✅ Navegação suave entre páginas
- ✅ Interface intuitiva com Tailwind CSS
- ✅ Ícones modernos com Lucide React

### Dashboard de Criptomoedas
- ✅ Acompanhamento de preços em tempo real
- ✅ Gráficos interativos com Recharts
- ✅ Integração com API externa
- ✅ Visualização de tendências

### Gerenciador de Tarefas
- ✅ **CRUD completo** - Criar, ler, atualizar e deletar tarefas
- ✅ **Sistema de prioridades** - Baixa, Média, Alta
- ✅ **Categorização** - Organização por categorias personalizadas
- ✅ **Filtros avançados** - Por status, prioridade, categoria e busca
- ✅ **Ordenação** - Por data, prioridade ou alfabética
- ✅ **Estatísticas em tempo real** - Dashboard com métricas
- ✅ **Progresso visual** - Barra de progresso dinâmica
- ✅ **Persistência de dados** - Armazenamento local
- ✅ **Interface responsiva** - Funciona em todos os dispositivos
- ✅ **Feedback visual** - Estados de hover, loading e transições

### Calculadora Avançada
- ✅ **Dois modos de operação** - Básico e Científico
- ✅ **Operações matemáticas** - Básicas e avançadas
- ✅ **Funções trigonométricas** - sin, cos, tan em graus
- ✅ **Funções logarítmicas** - Logaritmo natural e base 10
- ✅ **Potências e raízes** - Quadrado, cubo, potência customizada, raízes
- ✅ **Constantes matemáticas** - π (pi) e e (euler)
- ✅ **Sistema de memória** - Armazenar e recuperar valores
- ✅ **Histórico completo** - Registro de todos os cálculos
- ✅ **Interface moderna** - Design glassmorphism com gradientes
- ✅ **Responsividade total** - Funciona em desktop e mobile

### Blog TI
- ✅ **Sistema completo de blog** - Navegação, listagem e visualização de artigos
- ✅ **Busca inteligente** - Pesquisa por título, conteúdo e tags
- ✅ **Filtros por categoria** - 10 categorias técnicas organizadas
- ✅ **Artigos técnicos** - Conteúdo sobre React, Node.js, Docker, AI/ML, Web3
- ✅ **Syntax highlighting** - Código formatado com destaque de sintaxe
- ✅ **Sistema de tags** - Organização e descoberta de conteúdo
- ✅ **Sidebar informativa** - Artigos recentes, populares e estatísticas
- ✅ **Compartilhamento social** - Funcionalidade de compartilhar posts
- ✅ **Design responsivo** - Interface otimizada para todos os dispositivos
- ✅ **Newsletter integrada** - Sistema de inscrição para atualizações

## 📞 Contato

- **Nome:** Fabio Ferreira de Araujo
- **GitHub:** [@DevFabioAraujo](https://github.com/DevFabioAraujo)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ Se você gostou do projeto, não esqueça de dar uma estrela!
