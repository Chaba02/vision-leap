
import React from 'react';
import { 
  TrendingUp, ExternalLink, BarChart3
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

        <div className="max-w-4xl mx-auto animate-on-scroll">
          {/* Dashboard Container */}
          <div className="card-glass-dark p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-chapp-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chapp-accent-blue rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <span className="text-heading-md text-chapp-white font-semibold">
                  {t('Dashboard Aziendale')}
                </span>
              </div>
              
              <button
                onClick={handleDashboardClick}
                className="btn-chapp-small group"
              >
                <ExternalLink size={16} />
                {t('Vai alla Dashboard')}
              </button>
            </div>

            {/* KPI Card */}
            <div className="mb-8">
              <div className="dashboard-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-400/10">
                    <TrendingUp size={24} className="text-green-400" />
                  </div>
                  <span className="text-green-400 text-body-sm font-medium">
                    +12.5%
                  </span>
                </div>
                <div className="text-heading-xl text-chapp-white font-bold mb-1">
                  €500K
                </div>
                <div className="text-chapp-gray-400 text-body-sm">
                  {t('Fatturato Totale')}
                </div>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="dashboard-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-heading-md text-chapp-white">
                  {t('Andamento Fatturato')}
                </h4>
              </div>
              
              <div className="h-64">
                <ChartContainer config={revenueChartConfig}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
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
