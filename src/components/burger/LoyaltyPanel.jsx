import React from 'react';
import { X, Star, Gift, Crown, Trophy, Zap } from 'lucide-react';
import { loyaltyRewards } from '../../data/burgerData';

const LoyaltyPanel = ({ isOpen, onClose, loyalty }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Bronze':
        return <Star className="w-5 h-5 text-orange-600" />;
      case 'Silver':
        return <Zap className="w-5 h-5 text-gray-500" />;
      case 'Gold':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'Platinum':
        return <Crown className="w-5 h-5 text-purple-600" />;
      default:
        return <Star className="w-5 h-5 text-gray-400" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Bronze':
        return 'from-orange-500 to-orange-600';
      case 'Silver':
        return 'from-gray-400 to-gray-500';
      case 'Gold':
        return 'from-yellow-400 to-yellow-500';
      case 'Platinum':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getNextLevelPoints = (currentLevel, totalSpent) => {
    switch (currentLevel) {
      case 'Bronze':
        return { nextLevel: 'Silver', pointsNeeded: 50 - totalSpent };
      case 'Silver':
        return { nextLevel: 'Gold', pointsNeeded: 200 - totalSpent };
      case 'Gold':
        return { nextLevel: 'Platinum', pointsNeeded: 500 - totalSpent };
      case 'Platinum':
        return { nextLevel: null, pointsNeeded: 0 };
      default:
        return { nextLevel: 'Silver', pointsNeeded: 50 };
    }
  };

  const getProgressPercentage = (currentLevel, totalSpent) => {
    switch (currentLevel) {
      case 'Bronze':
        return Math.min((totalSpent / 50) * 100, 100);
      case 'Silver':
        return Math.min(((totalSpent - 50) / (200 - 50)) * 100, 100);
      case 'Gold':
        return Math.min(((totalSpent - 200) / (500 - 200)) * 100, 100);
      case 'Platinum':
        return 100;
      default:
        return 0;
    }
  };

  if (!isOpen || !loyalty) return null;

  const nextLevel = getNextLevelPoints(loyalty.level, loyalty.totalSpent);
  const progressPercentage = getProgressPercentage(loyalty.level, loyalty.totalSpent);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className={`flex items-center justify-between p-6 bg-gradient-to-r ${getLevelColor(loyalty.level)} text-white`}>
          <div className="flex items-center space-x-3">
            {getLevelIcon(loyalty.level)}
            <div>
              <h2 className="text-xl font-bold">Programa Fidelidade</h2>
              <p className="text-white/90">Nível {loyalty.level}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Points Summary */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {loyalty.points}
            </div>
            <p className="text-gray-600 font-medium">Pontos Disponíveis</p>
            <p className="text-sm text-gray-500 mt-1">
              Total gasto: {formatPrice(loyalty.totalSpent)}
            </p>
          </div>

          {/* Level Progress */}
          {nextLevel.nextLevel && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Progresso para {nextLevel.nextLevel}</h3>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${getLevelColor(nextLevel.nextLevel)} transition-all duration-500`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              <p className="text-sm text-gray-600">
                Gaste mais {formatPrice(Math.max(0, nextLevel.pointsNeeded))} para alcançar o nível {nextLevel.nextLevel}
              </p>
            </div>
          )}

          {/* Level Benefits */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Crown className="w-5 h-5 text-purple-600" />
              <span>Benefícios do Nível {loyalty.level}</span>
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>1 ponto por real gasto</span>
              </div>
              
              {loyalty.level !== 'Bronze' && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Desconto de aniversário</span>
                </div>
              )}
              
              {(loyalty.level === 'Gold' || loyalty.level === 'Platinum') && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Frete grátis sempre</span>
                </div>
              )}
              
              {loyalty.level === 'Platinum' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Prioridade no atendimento</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Acesso a produtos exclusivos</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <Gift className="w-5 h-5 text-green-600" />
              <span>Recompensas Disponíveis</span>
            </h3>
            
            <div className="space-y-3">
              {loyaltyRewards.map((reward) => {
                const canRedeem = loyalty.points >= reward.points;
                
                return (
                  <div
                    key={reward.id}
                    className={`border rounded-xl p-4 transition-all ${
                      canRedeem 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{reward.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-orange-600">
                            {reward.points} pontos
                          </span>
                          <button
                            disabled={!canRedeem}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              canRedeem
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {canRedeem ? 'Resgatar' : 'Insuficiente'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          {loyalty.history && loyalty.history.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Atividade Recente</h3>
              <div className="space-y-3">
                {loyalty.history.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-900">{activity.description}</p>
                      <p className="text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className={`font-medium ${
                      activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.type === 'earned' ? '+' : ''}{activity.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How it Works */}
          <div className="bg-blue-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Como Funciona</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>Faça pedidos e ganhe 1 ponto para cada real gasto</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>Acumule pontos para subir de nível e desbloquear benefícios</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>Troque seus pontos por recompensas incríveis</span>
              </div>
            </div>
          </div>

          {/* Levels Overview */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">Níveis de Fidelidade</h3>
            <div className="space-y-2">
              {[
                { level: 'Bronze', requirement: 'Inicial', color: 'text-orange-600' },
                { level: 'Silver', requirement: 'R$ 50 gastos', color: 'text-gray-500' },
                { level: 'Gold', requirement: 'R$ 200 gastos', color: 'text-yellow-500' },
                { level: 'Platinum', requirement: 'R$ 500 gastos', color: 'text-purple-600' }
              ].map((levelInfo) => (
                <div key={levelInfo.level} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {getLevelIcon(levelInfo.level)}
                    <span className={`font-medium ${levelInfo.color}`}>
                      {levelInfo.level}
                    </span>
                  </div>
                  <span className="text-gray-600">{levelInfo.requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPanel;
