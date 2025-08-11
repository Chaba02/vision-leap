
import React from 'react';
import { 
  TrendingUp, ExternalLink, BarChart3, Users, DollarSign, 
  ShoppingCart, Target, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const ChappSimpleBIDashboard = () => {
  const { t } = useLanguage();

  // Chart configuration
  const revenueChartConfig = {
    value: {
      label: "Fatturato",
      color: "#3b82f6",
    },
  };

  // Sample data
  const revenueData = [
    { month: 'Gen', value: 125000 },
    { month: 'Feb', value: 142000 },
    { month: 'Mar', value: 138000 },
    { month: 'Apr', value: 165000 },
    { month: 'Mag', value: 178000 },
    { month: 'Giu', value: 195000 }
  ];

  // KPI Data
  const kpiData = [
    {
      title: t('Fatturato Totale'),
      value: '€1.2M',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      period: t('vs mese scorso')
    },
    {
      title: t('Clienti Attivi'),
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      period: t('questo mese')
    },
    {
      title: t('Ordini Completati'),
      value: '4,326',
      change: '+15.7%',
      changeType: 'positive',
      icon: ShoppingCart,
      period: t('ultimo trimestre')
    },
    {
      title: t('Tasso Conversione'),
      value: '23.4%',
      change: '-2.1%',
      changeType: 'negative',
      icon: Target,
      period: t('media mensile')
    },
    {
      title: t('Valore Medio Ordine'),
      value: '€89',
      change: '+5.3%',
      changeType: 'positive',
      icon: TrendingUp,
      period: t('vs trimestre precedente')
    },
    {
      title: t('Sessioni Attive'),
      value: '12,459',
      change: '+18.9%',
      changeType: 'positive',
      icon: Activity,
      period: t('tempo reale')
    }
  ];

  const handleDashboardClick = () => {
    // Mock navigation to a dashboard page
    window.open('#/dashboard', '_blank');
  };

  const handleDemoRequest = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-chapp bg-gradient-to-b from-chapp-dark-bg to-chapp-night-blue/20">
      <div className="container-chapp">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-6 border border-chapp-white/20">
            <BarChart3 className="w-4 h-4" />
            {t('Demo Business Intelligence')}
          </div>
          
          <h2 className="text-display-lg text-chapp-title mb-6">
            {t('Dashboard')}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Intelligente
            </span>
          </h2>
          
          <p className="text-body-xl text-chapp-body max-w-2xl mx-auto">
            {t('Un esempio delle dashboard che creiamo per i nostri clienti. Dati in tempo reale, visualizzazioni chiare, decisioni informate.')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto animate-on-scroll">
          {/* Dashboard Container */}
          <div className="card-glass-dark p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-chapp-white/10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chapp-accent-blue rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-heading-md text-chapp-white font-semibold block">
                    {t('Dashboard Aziendale')}
                  </span>
                  <span className="text-chapp-gray-400 text-body-sm">
                    {t('Aggiornato')} 2 {t('minuti fa')}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleDashboardClick}
                className="btn-chapp-small group w-full sm:w-auto justify-center sm:justify-start"
              >
                <ExternalLink size={16} />
                {t('Apri Dashboard Completa')}
              </button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
              {kpiData.map((kpi, index) => {
                const IconComponent = kpi.icon;
                const isPositive = kpi.changeType === 'positive';
                const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
                
                return (
                  <div
                    key={index}
                    className="dashboard-card p-4 lg:p-6 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        isPositive ? 'bg-green-400/10' : 'bg-red-400/10'
                      }`}>
                        <IconComponent size={20} className={`${
                          isPositive ? 'text-green-400' : 'text-red-400'
                        }`} />
                      </div>
                      <div className={`flex items-center gap-1 text-body-sm font-medium ${
                        isPositive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <ChangeIcon size={16} />
                        {kpi.change}
                      </div>
                    </div>
                    
                    <div className="text-heading-xl text-chapp-white font-bold mb-1 group-hover:text-chapp-accent-blue transition-colors">
                      {kpi.value}
                    </div>
                    
                    <div className="text-chapp-gray-300 text-body-md font-medium mb-1">
                      {kpi.title}
                    </div>
                    
                    <div className="text-chapp-gray-500 text-body-sm">
                      {kpi.period}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Revenue Chart */}
            <div className="dashboard-card p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h4 className="text-heading-md text-chapp-white mb-1">
                    {t('Andamento Fatturato')}
                  </h4>
                  <p className="text-chapp-gray-400 text-body-sm">
                    {t('Ultimi 6 mesi - Crescita costante del')} +12.5%
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-green-400 text-body-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {t('Live')}
                </div>
              </div>
              
              <div className="h-64 lg:h-80">
                <ChartContainer config={revenueChartConfig}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.6)" 
                      fontSize={12}
                      tick={{ fill: 'rgba(255,255,255,0.6)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.6)" 
                      fontSize={12}
                      tick={{ fill: 'rgba(255,255,255,0.6)' }}
                      tickFormatter={(value: number) => `€${(value / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value: number) => [`€${(value / 1000).toFixed(0)}K`, 'Fatturato']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-value)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "var(--color-value)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="mt-6 p-4 lg:p-6 bg-chapp-white/5 backdrop-blur-sm border border-chapp-white/10 rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-heading-lg text-chapp-white font-bold mb-1">95%</div>
                  <div className="text-chapp-gray-300 text-body-md">{t('Soddisfazione Clienti')}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-heading-lg text-chapp-white font-bold mb-1">24/7</div>
                  <div className="text-chapp-gray-300 text-body-md">{t('Monitoraggio Continuo')}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-heading-lg text-chapp-white font-bold mb-1">99.9%</div>
                  <div className="text-chapp-gray-300 text-body-md">{t('Uptime Sistema')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 animate-on-scroll">
            <button 
              onClick={handleDemoRequest}
              className="btn-chapp-primary hover-glow-blue"
            >
              {t('Richiedi una Demo Personalizzata')}
            </button>
            <p className="text-chapp-gray-400 text-body-sm mt-4">
              {t('Scopri come possiamo creare soluzioni simili per il tuo business')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappSimpleBIDashboard;
