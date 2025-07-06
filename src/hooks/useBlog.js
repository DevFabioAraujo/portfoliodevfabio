import { useState, useMemo } from 'react'

export const useBlog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)

  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "React 18: Novas Funcionalidades e Concurrent Features",
      excerpt: "Explore as principais novidades do React 18, incluindo Concurrent Rendering, Suspense melhorado e as novas APIs que revolucionam o desenvolvimento frontend.",
      content: `React 18 trouxe mudanças significativas que transformam a forma como desenvolvemos aplicações web. Neste artigo, vamos explorar as principais funcionalidades.

## Concurrent Rendering

O Concurrent Rendering é uma das maiores inovações do React 18. Ele permite que o React interrompa, pause e retome o trabalho de renderização conforme necessário.

### Benefícios do Concurrent Rendering:
- Melhor responsividade da interface
- Priorização inteligente de atualizações
- Renderização não-bloqueante

## Suspense para Data Fetching

O Suspense agora suporta data fetching de forma nativa, permitindo uma experiência de carregamento mais fluida.

\`\`\`jsx
function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <ProfileTimeline />
    </Suspense>
  )
}
\`\`\`

## Automatic Batching

O React 18 introduz o batching automático para todas as atualizações, não apenas para event handlers.

### Antes do React 18:
- Apenas event handlers eram batchados
- Promises, timeouts não eram batchados

### Com React 18:
- Todas as atualizações são batchadas automaticamente
- Melhor performance por padrão

## Novas APIs

### startTransition
Permite marcar atualizações como não urgentes:

\`\`\`jsx
import { startTransition } from 'react'

function handleClick() {
  // Urgente: mostrar o que foi digitado
  setInputValue(input)
  
  // Não urgente: mostrar os resultados
  startTransition(() => {
    setSearchQuery(input)
  })
}
\`\`\`

### useDeferredValue
Hook para diferir valores não críticos:

\`\`\`jsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query)
  const results = useMemo(() => 
    searchData(deferredQuery), [deferredQuery]
  )
  
  return <div>{results}</div>
}
\`\`\`

## Migração para React 18

A migração é relativamente simples:

1. Atualize para React 18
2. Use createRoot ao invés de ReactDOM.render
3. Teste suas aplicações
4. Adote gradualmente as novas features

## Conclusão

React 18 representa um grande avanço na biblioteca, focando em performance e experiência do usuário. As novas funcionalidades permitem criar aplicações mais responsivas e eficientes.`,
      author: "Fabio Ferreira",
      date: "2024-01-15",
      category: "Frontend",
      icon: "⚛️",
      tags: ["React", "JavaScript", "Frontend", "Performance"],
      views: 1250
    },
    {
      id: 2,
      title: "Node.js e Express: Construindo APIs RESTful Modernas",
      excerpt: "Aprenda a criar APIs robustas e escaláveis usando Node.js e Express, com foco em boas práticas, segurança e performance.",
      content: `Construir APIs RESTful eficientes é fundamental no desenvolvimento moderno. Vamos explorar como criar APIs robustas com Node.js e Express.

## Configuração Inicial

Primeiro, vamos configurar nosso projeto:

\`\`\`bash
npm init -y
npm install express cors helmet morgan dotenv
npm install -D nodemon
\`\`\`

## Estrutura do Projeto

Uma boa estrutura é essencial:

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── app.js
\`\`\`

## Configuração Básica do Express

\`\`\`javascript
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

// Middleware de segurança
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

module.exports = app
\`\`\`

## Criando Rotas RESTful

### Estrutura de Rotas
\`\`\`javascript
const express = require('express')
const router = express.Router()

// GET /api/users
router.get('/', getAllUsers)

// GET /api/users/:id
router.get('/:id', getUserById)

// POST /api/users
router.post('/', createUser)

// PUT /api/users/:id
router.put('/:id', updateUser)

// DELETE /api/users/:id
router.delete('/:id', deleteUser)

module.exports = router
\`\`\`

## Controllers

Separar a lógica em controllers:

\`\`\`javascript
const User = require('../models/User')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    
    res.status(201).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
\`\`\`

## Middleware de Validação

\`\`\`javascript
const validateUser = (req, res, next) => {
  const { name, email } = req.body
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Nome e email são obrigatórios'
    })
  }
  
  next()
}
\`\`\`

## Tratamento de Erros

\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor'
  })
}

app.use(errorHandler)
\`\`\`

## Boas Práticas

### 1. Versionamento de API
\`\`\`javascript
app.use('/api/v1/users', userRoutes)
\`\`\`

### 2. Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
})

app.use(limiter)
\`\`\`

### 3. Validação com Joi
\`\`\`javascript
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(120)
})
\`\`\`

## Conclusão

Criar APIs RESTful robustas requer atenção a detalhes como estrutura, segurança e performance. Seguindo essas práticas, você terá APIs escaláveis e maintíveis.`,
      author: "Fabio Ferreira",
      date: "2024-01-12",
      category: "Backend",
      icon: "🚀",
      tags: ["Node.js", "Express", "API", "Backend"],
      views: 980
    },
    {
      id: 3,
      title: "Docker e Kubernetes: Containerização para Desenvolvedores",
      excerpt: "Guia completo sobre containerização com Docker e orquestração com Kubernetes, desde conceitos básicos até deploy em produção.",
      content: `Containerização revolucionou o desenvolvimento e deploy de aplicações. Vamos explorar Docker e Kubernetes de forma prática.

## O que é Docker?

Docker é uma plataforma que permite empacotar aplicações em containers - ambientes isolados e portáveis.

### Vantagens do Docker:
- Consistência entre ambientes
- Isolamento de dependências
- Facilidade de deploy
- Escalabilidade

## Dockerfile Básico

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
\`\`\`

## Docker Compose

Para aplicações multi-container:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Introdução ao Kubernetes

Kubernetes orquestra containers em escala, fornecendo:
- Auto-scaling
- Load balancing
- Self-healing
- Rolling updates

## Deployment Kubernetes

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
\`\`\`

## Service Kubernetes

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
\`\`\`

## ConfigMap e Secrets

### ConfigMap para configurações:
\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  database_url: "postgresql://localhost:5432/myapp"
  redis_url: "redis://localhost:6379"
\`\`\`

### Secret para dados sensíveis:
\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secrets
type: Opaque
data:
  db_password: cGFzc3dvcmQ=  # base64 encoded
  api_key: YWJjZGVmZ2g=      # base64 encoded
\`\`\`

## Boas Práticas

### 1. Multi-stage Builds
\`\`\`dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
\`\`\`

### 2. Health Checks
\`\`\`yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

### 3. Resource Limits
Sempre defina limits e requests para CPU e memória.

## Monitoramento

Use ferramentas como:
- Prometheus para métricas
- Grafana para visualização
- Jaeger para tracing

## Conclusão

Docker e Kubernetes são essenciais no desenvolvimento moderno. Dominar essas tecnologias permite criar aplicações mais robustas e escaláveis.`,
      author: "Fabio Ferreira",
      date: "2024-01-10",
      category: "DevOps",
      icon: "🐳",
      tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
      views: 1100
    },
    {
      id: 4,
      title: "React Native vs Flutter: Qual Escolher em 2024?",
      excerpt: "Comparação detalhada entre React Native e Flutter, analisando performance, produtividade, ecossistema e casos de uso ideais.",
      content: `A escolha entre React Native e Flutter é uma das decisões mais importantes no desenvolvimento mobile. Vamos analisar ambas as tecnologias.

## React Native

### Vantagens:
- Compartilhamento de código com React web
- Grande comunidade e ecossistema
- Hot reload para desenvolvimento rápido
- Suporte nativo do Facebook/Meta

### Desvantagens:
- Performance inferior ao nativo
- Dependência de bridges
- Fragmentação de versões

## Flutter

### Vantagens:
- Performance próxima ao nativo
- UI consistente entre plataformas
- Hot reload extremamente rápido
- Suporte oficial do Google

### Desvantagens:
- Linguagem Dart menos popular
- Tamanho do app maior
- Ecossistema menor

## Comparação Técnica

### Performance
Flutter geralmente oferece melhor performance devido ao seu engine customizado.

### Desenvolvimento
React Native pode ser mais rápido para equipes que já conhecem React.

### UI/UX
Flutter oferece mais controle sobre a interface, enquanto React Native usa componentes nativos.

## Casos de Uso

### Escolha React Native quando:
- Equipe já conhece React
- Precisa integrar com apps existentes
- Orçamento limitado para aprendizado

### Escolha Flutter quando:
- Performance é crítica
- Precisa de UI altamente customizada
- Quer consistência visual total

## Conclusão

Ambas são excelentes opções. A escolha depende do contexto do projeto, equipe e requisitos específicos.`,
      author: "Fabio Ferreira",
      date: "2024-01-08",
      category: "Mobile",
      icon: "📱",
      tags: ["React Native", "Flutter", "Mobile", "Comparação"],
      views: 850
    },
    {
      id: 5,
      title: "Machine Learning com Python: Primeiros Passos",
      excerpt: "Introdução prática ao Machine Learning usando Python, pandas, scikit-learn e as principais técnicas de análise de dados.",
      content: `Machine Learning está transformando a tecnologia. Vamos começar nossa jornada com Python e as principais bibliotecas.

## Configuração do Ambiente

\`\`\`bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
\`\`\`

## Carregando e Explorando Dados

\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Carregando dados
df = pd.read_csv('dataset.csv')

# Explorando os dados
print(df.head())
print(df.info())
print(df.describe())
\`\`\`

## Pré-processamento

### Limpeza de Dados
\`\`\`python
# Removendo valores nulos
df = df.dropna()

# Ou preenchendo com média
df['coluna'].fillna(df['coluna'].mean(), inplace=True)
\`\`\`

### Encoding de Variáveis Categóricas
\`\`\`python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label Encoding
le = LabelEncoder()
df['categoria_encoded'] = le.fit_transform(df['categoria'])

# One-Hot Encoding
df_encoded = pd.get_dummies(df, columns=['categoria'])
\`\`\`

## Primeiro Modelo: Regressão Linear

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Preparando dados
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# Dividindo em treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Treinando modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Fazendo predições
y_pred = model.predict(X_test)

# Avaliando
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'MSE: {mse}')
print(f'R²: {r2}')
\`\`\`

## Classificação com Random Forest

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Modelo de classificação
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predições
y_pred = clf.predict(X_test)

# Avaliação
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
\`\`\`

## Validação Cruzada

\`\`\`python
from sklearn.model_selection import cross_val_score

# Validação cruzada
scores = cross_val_score(clf, X, y, cv=5)
print(f'Accuracy: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})')
\`\`\`

## Visualização de Resultados

\`\`\`python
# Matriz de confusão
plt.figure(figsize=(8, 6))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d')
plt.title('Matriz de Confusão')
plt.show()

# Importância das features
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': clf.feature_importances_
}).sort_values('importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance, x='importance', y='feature')
plt.title('Importância das Features')
plt.show()
\`\`\`

## Próximos Passos

1. Experimente diferentes algoritmos
2. Faça feature engineering
3. Use técnicas de ensemble
4. Implemente deep learning com TensorFlow/PyTorch

## Conclusão

Machine Learning com Python é acessível e poderoso. Com prática e experimentação, você pode resolver problemas complexos e gerar insights valiosos.`,
      author: "Fabio Ferreira",
      date: "2024-01-05",
      category: "AI/ML",
      icon: "🤖",
      tags: ["Python", "Machine Learning", "Data Science", "AI"],
      views: 1300
    },
    {
      id: 6,
      title: "Web3 e Blockchain: O Futuro da Internet Descentralizada",
      excerpt: "Explore o mundo Web3, smart contracts, DeFi e como a blockchain está revolucionando a internet e criando novas oportunidades.",
      content: `Web3 representa a próxima evolução da internet, baseada em descentralização, propriedade digital e novas formas de interação online.

## O que é Web3?

Web3 é a terceira geração da internet, caracterizada por:
- Descentralização
- Propriedade de dados pelo usuário
- Economia de tokens
- Interoperabilidade

## Blockchain Fundamentals

### Conceitos Básicos:
- Blocos e hashes
- Consenso distribuído
- Imutabilidade
- Transparência

### Principais Blockchains:
- Ethereum: Smart contracts
- Bitcoin: Store of value
- Solana: High performance
- Polygon: Layer 2 scaling

## Smart Contracts

Contratos auto-executáveis na blockchain:

\`\`\`solidity
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 data);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}
\`\`\`

## DeFi (Finanças Descentralizadas)

### Principais Protocolos:
- Uniswap: DEX (exchange descentralizada)
- Compound: Lending/borrowing
- MakerDAO: Stablecoin DAI
- Aave: Liquidity protocol

### Vantagens do DeFi:
- Sem intermediários
- Acesso global
- Transparência total
- Composabilidade

## NFTs (Non-Fungible Tokens)

Tokens únicos que representam propriedade digital:

### Casos de Uso:
- Arte digital
- Colecionáveis
- Gaming items
- Certificados
- Identidade digital

## Desenvolvimento Web3

### Stack Tecnológico:
- Frontend: React/Next.js
- Blockchain: Ethereum/Solana
- Wallet: MetaMask/WalletConnect
- Storage: IPFS
- Indexing: The Graph

### Exemplo com ethers.js:
\`\`\`javascript
import { ethers } from 'ethers'

// Conectar com MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

// Interagir com contrato
const contract = new ethers.Contract(address, abi, signer)
const result = await contract.someFunction()
\`\`\`

## DAOs (Organizações Autônomas Descentralizadas)

Organizações governadas por smart contracts:

### Características:
- Governança descentralizada
- Votação on-chain
- Transparência total
- Execução automática

## Desafios do Web3

### Técnicos:
- Escalabilidade
- UX complexa
- Gas fees altos
- Interoperabilidade

### Regulatórios:
- Incerteza legal
- Compliance
- Tributação

## Oportunidades

### Para Desenvolvedores:
- Novos modelos de negócio
- Economia de tokens
- Comunidades globais
- Inovação constante

### Para Usuários:
- Propriedade de dados
- Novos investimentos
- Participação em governança
- Acesso global a serviços

## Ferramentas Essenciais

### Desenvolvimento:
- Hardhat/Truffle: Development framework
- Remix: Online IDE
- OpenZeppelin: Security libraries
- Alchemy/Infura: Node providers

### Análise:
- Etherscan: Block explorer
- DeFiPulse: DeFi analytics
- Dune Analytics: Custom queries

## Futuro do Web3

### Tendências:
- Layer 2 solutions
- Cross-chain bridges
- Better UX
- Mainstream adoption
- Regulatory clarity

## Conclusão

Web3 está redefinindo a internet, criando novas oportunidades e desafios. Para desenvolvedores, é uma área em crescimento exponencial com potencial transformador.`,
      author: "Fabio Ferreira",
      date: "2024-01-03",
      category: "Web3",
      icon: "🔗",
      tags: ["Web3", "Blockchain", "DeFi", "Smart Contracts"],
      views: 750
    }
  ]

  const categories = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'AI/ML', 'Web3', 
    'Tutorial', 'Carreira', 'Ferramentas', 'Tendências'
  ]

  // Filter posts based on search term and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === '' || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchTerm, selectedCategory])

  return {
    posts,
    categories,
    searchTerm,
    selectedCategory,
    selectedPost,
    setSearchTerm,
    setSelectedCategory,
    setSelectedPost,
    filteredPosts
  }
}
