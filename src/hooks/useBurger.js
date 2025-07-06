import { useState, useEffect, useCallback } from 'react';
import burgerService from '../services/burgerService';
import { menuItems, categories, promotions, loyaltyRewards } from '../data/burgerData';

export const useBurger = () => {
  // Estados principais
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loyalty, setLoyalty] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100 },
    dietary: [],
    allergens: []
  });

  // Estados do carrinho
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    deliveryFee: 0,
    serviceFee: 0,
    total: 0,
    itemCount: 0
  });

  // Estados de modais e UI
  const [showCart, setShowCart] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Inicialização
  useEffect(() => {
    loadInitialData();
    setupEventListeners();
    
    return () => {
      removeEventListeners();
    };
  }, []);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Carregar dados do localStorage
      const cartData = burgerService.getCart();
      const favoritesData = burgerService.getFavorites();
      const ordersData = burgerService.getOrders();
      const loyaltyData = burgerService.getLoyalty();
      const userData = burgerService.getFromStorage('burgerhub_user');
      const notificationsData = burgerService.getNotifications();
      
      setCart(cartData);
      setFavorites(favoritesData);
      setOrders(ordersData);
      setLoyalty(loyaltyData);
      setUser(userData);
      setNotifications(notificationsData);
      
      // Calcular totais do carrinho
      if (cartData.length > 0) {
        const totals = burgerService.calculateCartTotal(cartData);
        setCartTotals(totals);
      }
      
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const setupEventListeners = useCallback(() => {
    window.addEventListener('orderStatusUpdate', handleOrderStatusUpdate);
  }, []);

  const removeEventListeners = useCallback(() => {
    window.removeEventListener('orderStatusUpdate', handleOrderStatusUpdate);
  }, []);

  const handleOrderStatusUpdate = useCallback((event) => {
    const { orderId, status, message } = event.detail;
    
    // Atualizar lista de pedidos
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );

    // Adicionar notificação
    addNotification({
      title: 'Atualização do Pedido',
      message,
      type: 'order',
      orderId
    });
  }, []);

  // Funções do carrinho
  const addToCart = useCallback((item, customizations = {}) => {
    try {
      const updatedCart = burgerService.addToCart(item, customizations);
      setCart(updatedCart);
      
      const totals = burgerService.calculateCartTotal(updatedCart);
      setCartTotals(totals);
      
      addNotification({
        title: 'Item adicionado',
        message: `${item.name} foi adicionado ao carrinho`,
        type: 'success'
      });
      
      return true;
    } catch {
      setError('Erro ao adicionar item ao carrinho');
      return false;
    }
  }, []);

  const updateCartItem = useCallback((itemId, updates) => {
    try {
      const updatedCart = burgerService.updateCartItem(itemId, updates);
      setCart(updatedCart);
      
      const totals = burgerService.calculateCartTotal(updatedCart);
      setCartTotals(totals);
      
      return true;
    } catch {
      setError('Erro ao atualizar item do carrinho');
      return false;
    }
  }, []);

  const removeFromCart = useCallback((itemId) => {
    try {
      const updatedCart = burgerService.removeFromCart(itemId);
      setCart(updatedCart);
      
      const totals = burgerService.calculateCartTotal(updatedCart);
      setCartTotals(totals);
      
      addNotification({
        title: 'Item removido',
        message: 'Item removido do carrinho',
        type: 'info'
      });
      
      return true;
    } catch {
      setError('Erro ao remover item do carrinho');
      return false;
    }
  }, []);

  const clearCart = useCallback(() => {
    try {
      burgerService.clearCart();
      setCart([]);
      setCartTotals({
        subtotal: 0,
        deliveryFee: 0,
        serviceFee: 0,
        total: 0,
        itemCount: 0
      });
      
      return true;
    } catch {
      setError('Erro ao limpar carrinho');
      return false;
    }
  }, []);

  // Funções de pedidos
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      
      const order = burgerService.createOrder(orderData);
      setOrders(prevOrders => [...prevOrders, order]);
      
      // Limpar carrinho
      setCart([]);
      setCartTotals({
        subtotal: 0,
        deliveryFee: 0,
        serviceFee: 0,
        total: 0,
        itemCount: 0
      });
      
      // Atualizar pontos de fidelidade
      const updatedLoyalty = burgerService.getLoyalty();
      setLoyalty(updatedLoyalty);
      
      setCurrentOrder(order);
      setShowOrderTracking(true);
      
      addNotification({
        title: 'Pedido confirmado!',
        message: `Pedido #${order.orderNumber} foi confirmado`,
        type: 'success'
      });
      
      return order;
    } catch {
      setError('Erro ao criar pedido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Funções de favoritos
  const toggleFavorite = useCallback((itemId) => {
    try {
      const isFavorite = favorites.includes(itemId);
      
      if (isFavorite) {
        const updatedFavorites = burgerService.removeFromFavorites(itemId);
        setFavorites(updatedFavorites);
        
        addNotification({
          title: 'Removido dos favoritos',
          message: 'Item removido dos seus favoritos',
          type: 'info'
        });
      } else {
        const updatedFavorites = burgerService.addToFavorites(itemId);
        setFavorites(updatedFavorites);
        
        addNotification({
          title: 'Adicionado aos favoritos',
          message: 'Item adicionado aos seus favoritos',
          type: 'success'
        });
      }
      
      return true;
    } catch {
      setError('Erro ao atualizar favoritos');
      return false;
    }
  }, [favorites]);

  // Funções de busca e filtros
  const getFilteredItems = useCallback(() => {
    let items = [...menuItems];
    
    // Aplicar busca
    if (searchQuery) {
      items = burgerService.searchItems(searchQuery, items);
    }
    
    // Aplicar filtros
    const currentFilters = {
      ...filters,
      category: selectedCategory
    };
    items = burgerService.filterItems(items, currentFilters);
    
    // Aplicar ordenação
    items = burgerService.sortItems(items, sortBy);
    
    return items;
  }, [searchQuery, selectedCategory, sortBy, filters]);

  // Funções de fidelidade
  const redeemReward = useCallback((rewardId, pointsCost) => {
    try {
      const success = burgerService.redeemReward(rewardId, pointsCost);
      
      if (success) {
        const updatedLoyalty = burgerService.getLoyalty();
        setLoyalty(updatedLoyalty);
        
        addNotification({
          title: 'Recompensa resgatada!',
          message: 'Sua recompensa foi resgatada com sucesso',
          type: 'success'
        });
        
        return true;
      } else {
        addNotification({
          title: 'Pontos insuficientes',
          message: 'Você não tem pontos suficientes para esta recompensa',
          type: 'error'
        });
        
        return false;
      }
    } catch {
      setError('Erro ao resgatar recompensa');
      return false;
    }
  }, []);

  // Funções de notificações
  const addNotification = useCallback((notification) => {
    const newNotification = burgerService.addNotification(notification);
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remover notificação após 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, []);

  const markNotificationAsRead = useCallback((notificationId) => {
    const updatedNotifications = burgerService.markNotificationAsRead(notificationId);
    setNotifications(updatedNotifications);
  }, []);

  // Funções de customização
  const openCustomizer = useCallback((item) => {
    setSelectedItem(item);
    setShowCustomizer(true);
  }, []);

  const closeCustomizer = useCallback(() => {
    setSelectedItem(null);
    setShowCustomizer(false);
  }, []);

  // Funções de UI
  const toggleCart = useCallback(() => {
    setShowCart(prev => !prev);
  }, []);

  const openOrderTracking = useCallback((order) => {
    setCurrentOrder(order);
    setShowOrderTracking(true);
  }, []);

  const closeOrderTracking = useCallback(() => {
    setCurrentOrder(null);
    setShowOrderTracking(false);
  }, []);

  // Dados computados
  const stats = {
    totalItems: menuItems.length,
    totalCategories: categories.length,
    cartItemCount: cartTotals.itemCount,
    favoriteCount: favorites.length,
    orderCount: orders.length,
    loyaltyPoints: loyalty?.points || 0,
    loyaltyLevel: loyalty?.level || 'Bronze'
  };

  return {
    // Estados
    cart,
    favorites,
    orders,
    loyalty,
    user,
    notifications,
    loading,
    error,
    cartTotals,
    stats,
    
    // Estados de UI
    showCart,
    showCustomizer,
    selectedItem,
    showOrderTracking,
    currentOrder,
    
    // Estados de filtros
    searchQuery,
    selectedCategory,
    sortBy,
    filters,
    
    // Dados
    menuItems,
    categories,
    promotions,
    loyaltyRewards,
    filteredItems: getFilteredItems(),
    
    // Funções do carrinho
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    toggleCart,
    
    // Funções de pedidos
    createOrder,
    openOrderTracking,
    closeOrderTracking,
    
    // Funções de favoritos
    toggleFavorite,
    
    // Funções de busca e filtros
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    setFilters,
    
    // Funções de fidelidade
    redeemReward,
    
    // Funções de customização
    openCustomizer,
    closeCustomizer,
    
    // Funções de notificações
    addNotification,
    markNotificationAsRead,
    
    // Funções de UI
    setShowCart,
    setError,
    setLoading
  };
};

export default useBurger;
