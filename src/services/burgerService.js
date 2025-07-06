// Serviços da hamburgueria com simulação de SQLite usando localStorage
class BurgerService {
  constructor() {
    this.storageKeys = {
      orders: 'burgerhub_orders',
      cart: 'burgerhub_cart',
      user: 'burgerhub_user',
      favorites: 'burgerhub_favorites',
      loyalty: 'burgerhub_loyalty',
      reviews: 'burgerhub_reviews',
      customBurgers: 'burgerhub_custom_burgers'
    };
    this.initializeData();
  }

  // Inicializar dados padrão
  initializeData() {
    if (!this.getFromStorage(this.storageKeys.user)) {
      this.setToStorage(this.storageKeys.user, {
        id: this.generateId(),
        name: 'Usuário',
        email: '',
        phone: '',
        addresses: [],
        preferences: {
          theme: 'light',
          notifications: true,
          allergens: []
        },
        createdAt: new Date().toISOString()
      });
    }

    if (!this.getFromStorage(this.storageKeys.loyalty)) {
      this.setToStorage(this.storageKeys.loyalty, {
        points: 0,
        totalSpent: 0,
        level: 'Bronze',
        rewards: [],
        history: []
      });
    }

    if (!this.getFromStorage(this.storageKeys.orders)) {
      this.setToStorage(this.storageKeys.orders, []);
    }

    if (!this.getFromStorage(this.storageKeys.reviews)) {
      this.setToStorage(this.storageKeys.reviews, []);
    }
  }

  // Utilitários de storage
  getFromStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error);
      return null;
    }
  }

  setToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      return false;
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Gerenciamento do carrinho
  getCart() {
    return this.getFromStorage(this.storageKeys.cart) || [];
  }

  addToCart(item, customizations = {}) {
    const cart = this.getCart();
    const cartItem = {
      id: this.generateId(),
      ...item,
      customizations,
      quantity: 1,
      addedAt: new Date().toISOString()
    };

    // Verificar se item já existe com mesmas customizações
    const existingIndex = cart.findIndex(cartItem => 
      cartItem.productId === item.id && 
      JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...cartItem, productId: item.id });
    }

    this.setToStorage(this.storageKeys.cart, cart);
    return cart;
  }

  updateCartItem(itemId, updates) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
      cart[itemIndex] = { ...cart[itemIndex], ...updates };
      this.setToStorage(this.storageKeys.cart, cart);
    }
    
    return cart;
  }

  removeFromCart(itemId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.id !== itemId);
    this.setToStorage(this.storageKeys.cart, filteredCart);
    return filteredCart;
  }

  clearCart() {
    this.setToStorage(this.storageKeys.cart, []);
    return [];
  }

  // Cálculos do carrinho
  calculateCartTotal(cart = null) {
    const cartItems = cart || this.getCart();
    
    const subtotal = cartItems.reduce((total, item) => {
      let itemPrice = item.price;
      
      // Adicionar preço das customizações
      if (item.customizations) {
        Object.values(item.customizations).forEach(customization => {
          if (Array.isArray(customization)) {
            customization.forEach(custom => {
              if (custom.price) itemPrice += custom.price;
            });
          } else if (customization && customization.price) {
            itemPrice += customization.price;
          }
        });
      }
      
      return total + (itemPrice * item.quantity);
    }, 0);

    const deliveryFee = subtotal > 50 ? 0 : 5.90;
    const serviceFee = subtotal * 0.02; // 2% taxa de serviço
    const total = subtotal + deliveryFee + serviceFee;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      deliveryFee: Number(deliveryFee.toFixed(2)),
      serviceFee: Number(serviceFee.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    };
  }

  // Gerenciamento de pedidos
  createOrder(orderData) {
    const orders = this.getFromStorage(this.storageKeys.orders) || [];
    const cart = this.getCart();
    const totals = this.calculateCartTotal(cart);
    
    const order = {
      id: this.generateId(),
      orderNumber: `BH${Date.now().toString().slice(-6)}`,
      items: cart,
      customer: orderData.customer,
      delivery: orderData.delivery,
      payment: orderData.payment,
      totals,
      status: 'confirmed',
      estimatedTime: this.calculateEstimatedTime(cart),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          message: 'Pedido confirmado'
        }
      ]
    };

    orders.push(order);
    this.setToStorage(this.storageKeys.orders, orders);
    
    // Limpar carrinho após criar pedido
    this.clearCart();
    
    // Adicionar pontos de fidelidade
    this.addLoyaltyPoints(totals.total);
    
    // Simular progresso do pedido
    this.simulateOrderProgress(order.id);
    
    return order;
  }

  getOrders() {
    return this.getFromStorage(this.storageKeys.orders) || [];
  }

  getOrder(orderId) {
    const orders = this.getOrders();
    return orders.find(order => order.id === orderId);
  }

  updateOrderStatus(orderId, status, message) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      orders[orderIndex].timeline.push({
        status,
        timestamp: new Date().toISOString(),
        message
      });
      
      this.setToStorage(this.storageKeys.orders, orders);
    }
    
    return orders[orderIndex];
  }

  // Simular progresso do pedido
  simulateOrderProgress(orderId) {
    const statuses = [
      { status: 'preparing', message: 'Preparando seu pedido', delay: 2000 },
      { status: 'cooking', message: 'Cozinhando com carinho', delay: 8000 },
      { status: 'ready', message: 'Pedido pronto para entrega', delay: 5000 },
      { status: 'delivering', message: 'Saiu para entrega', delay: 3000 },
      { status: 'delivered', message: 'Pedido entregue', delay: 10000 }
    ];

    statuses.forEach((statusUpdate) => {
      setTimeout(() => {
        this.updateOrderStatus(orderId, statusUpdate.status, statusUpdate.message);
        
        // Disparar evento customizado para atualizar UI
        window.dispatchEvent(new CustomEvent('orderStatusUpdate', {
          detail: { orderId, status: statusUpdate.status, message: statusUpdate.message }
        }));
      }, statusUpdate.delay);
    });
  }

  calculateEstimatedTime(items) {
    const baseTime = 15; // tempo base em minutos
    const itemTime = items.reduce((time, item) => time + (item.prepTime || 5), 0);
    return Math.max(baseTime, Math.ceil(itemTime / items.length)) + Math.floor(Math.random() * 10);
  }

  // Sistema de fidelidade
  getLoyalty() {
    return this.getFromStorage(this.storageKeys.loyalty) || {
      points: 0,
      totalSpent: 0,
      level: 'Bronze',
      rewards: [],
      history: []
    };
  }

  addLoyaltyPoints(amount) {
    const loyalty = this.getLoyalty();
    const pointsEarned = Math.floor(amount); // 1 ponto por real gasto
    
    loyalty.points += pointsEarned;
    loyalty.totalSpent += amount;
    loyalty.history.push({
      type: 'earned',
      points: pointsEarned,
      amount,
      timestamp: new Date().toISOString(),
      description: `Compra de R$ ${amount.toFixed(2)}`
    });

    // Atualizar nível
    loyalty.level = this.calculateLoyaltyLevel(loyalty.totalSpent);
    
    this.setToStorage(this.storageKeys.loyalty, loyalty);
    return loyalty;
  }

  redeemReward(rewardId, pointsCost) {
    const loyalty = this.getLoyalty();
    
    if (loyalty.points >= pointsCost) {
      loyalty.points -= pointsCost;
      loyalty.history.push({
        type: 'redeemed',
        points: -pointsCost,
        timestamp: new Date().toISOString(),
        description: `Resgate de recompensa: ${rewardId}`
      });
      
      this.setToStorage(this.storageKeys.loyalty, loyalty);
      return true;
    }
    
    return false;
  }

  calculateLoyaltyLevel(totalSpent) {
    if (totalSpent >= 500) return 'Platinum';
    if (totalSpent >= 200) return 'Gold';
    if (totalSpent >= 50) return 'Silver';
    return 'Bronze';
  }

  // Favoritos
  getFavorites() {
    return this.getFromStorage(this.storageKeys.favorites) || [];
  }

  addToFavorites(itemId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(itemId)) {
      favorites.push(itemId);
      this.setToStorage(this.storageKeys.favorites, favorites);
    }
    return favorites;
  }

  removeFromFavorites(itemId) {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(id => id !== itemId);
    this.setToStorage(this.storageKeys.favorites, filtered);
    return filtered;
  }

  // Reviews
  getReviews(itemId = null) {
    const reviews = this.getFromStorage(this.storageKeys.reviews) || [];
    return itemId ? reviews.filter(review => review.itemId === itemId) : reviews;
  }

  addReview(itemId, rating, comment) {
    const reviews = this.getReviews();
    const review = {
      id: this.generateId(),
      itemId,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      helpful: 0
    };
    
    reviews.push(review);
    this.setToStorage(this.storageKeys.reviews, reviews);
    return review;
  }

  // Hambúrgueres customizados
  saveCustomBurger(burger) {
    const customBurgers = this.getFromStorage(this.storageKeys.customBurgers) || [];
    const customBurger = {
      id: this.generateId(),
      ...burger,
      createdAt: new Date().toISOString()
    };
    
    customBurgers.push(customBurger);
    this.setToStorage(this.storageKeys.customBurgers, customBurgers);
    return customBurger;
  }

  getCustomBurgers() {
    return this.getFromStorage(this.storageKeys.customBurgers) || [];
  }

  // Busca e filtros
  searchItems(query, items) {
    if (!query) return items;
    
    const searchTerm = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
    );
  }

  filterItems(items, filters) {
    let filtered = [...items];
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(item => 
        item.price >= filters.priceRange.min && item.price <= filters.priceRange.max
      );
    }
    
    if (filters.dietary) {
      if (filters.dietary.includes('vegan')) {
        filtered = filtered.filter(item => item.isVegan);
      }
      if (filters.dietary.includes('healthy')) {
        filtered = filtered.filter(item => item.isHealthy);
      }
    }
    
    if (filters.allergens && filters.allergens.length > 0) {
      filtered = filtered.filter(item => 
        !item.allergens || !item.allergens.some(allergen => 
          filters.allergens.includes(allergen)
        )
      );
    }
    
    return filtered;
  }

  sortItems(items, sortBy) {
    const sorted = [...items];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popular':
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  // Notificações
  getNotifications() {
    return this.getFromStorage('burgerhub_notifications') || [];
  }

  addNotification(notification) {
    const notifications = this.getNotifications();
    const newNotification = {
      id: this.generateId(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    notifications.unshift(newNotification);
    
    // Manter apenas as últimas 50 notificações
    if (notifications.length > 50) {
      notifications.splice(50);
    }
    
    this.setToStorage('burgerhub_notifications', notifications);
    return newNotification;
  }

  markNotificationAsRead(notificationId) {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
      notification.read = true;
      this.setToStorage('burgerhub_notifications', notifications);
    }
    
    return notifications;
  }
}

// Instância singleton do serviço
const burgerService = new BurgerService();
export default burgerService;
