
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Filter, Calendar, Download, RefreshCw } from 'lucide-react';

const ChappBIDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);

  // Dati simulati che cambiano in base ai filtri
  const generateData = () => {
    const baseRevenue = selectedPeriod === 'year' ? 1200000 : selectedPeriod === 'month' ? 95000 : 25000;
    const baseUsers = selectedPeriod === 'year' ? 12500 : selectedPeriod === 'month' ? 1850 : 450;
    const regionMultiplier = selectedRegion === 'europe' ? 1.2 : selectedRegion === 'america' ? 0.8 : 1;

    return {
      revenue: Math.round(baseRevenue * regionMultiplier),
      users: Math.round(baseUsers * regionMultiplier),
      growth: selectedPeriod === 'year' ? '+24%' : selectedPeriod === 'month' ? '+12%' : '+8%',
      orders: Math.round((baseRevenue / 50) * regionMultiplier)
    };
  };

  const [data, setData] = useState(generateData());

  useEffect(() => {
    setData(generateData());
    setAnimateCharts(true);
    setTimeout(() => setAnimateCharts(false), 1000);
  }, [selectedPeriod, selectedRegion]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateData());
      setIsRefreshing(false);
      setAnimateCharts(true);
      setTimeout(() => setAnimateCharts(false), 1000);
    }, 1500);
  };

  const periods = [
    { value: 'week', label: 'Settimana' },
    { value: 'month', label: 'Mese' },
    { value: 'year', label: 'Anno' }
  ];

  const regions = [
    { value: 'all', label: 'Tutto il mondo' },
    { value: 'europe', label: 'Europa' },
    { value: 'america', label: 'America' }
  ];

  // Dati per il grafico a barre
  const chartData = [
    { label: 'Gen', value: selectedPeriod === 'year' ? 85 : 65 },
    { label: 'Feb', value: selectedPeriod === 'year' ? 92 : 78 },
    { label: 'Mar', value: selectedPeriod === 'year' ? 78 : 85 },
    { label: 'Apr', value: selectedPeriod === 'year' ? 95 : 72 },
    { label: 'Mag', value: selectedPeriod === 'year' ? 88 : 90 },
    { label: 'Giu', value: selectedPeriod === 'year' ? 110 : 95 }
  ];

  return (
    <section className="section-chapp bg-gradient-to-b from-chapp-dark-bg to-chapp-night-blue/20">
      <div className="container-chapp">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-6 border border-chapp-white/20">
            <BarChart3 className="w-4 h-4" />
            Demo Interattiva
          </div>
          
          <h2 className="text-display-lg text-chapp-title mb-6">
            Dashboard{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Business Intelligence
            </span>
          </h2>
          
          <p className="text-body-xl text-chapp-body max-w-3xl mx-auto">
            Esplora una demo completamente funzionante della nostra dashboard BI. 
            Interagisci con i filtri e osserva come i dati si aggiornano in tempo reale.
          </p>
        </div>

        <div className="max-w-7xl mx-auto animate-on-scroll">
          {/* Dashboard Container */}
          <div className="card-glass-dark p-6 lg:p-8">
            {/* Dashboard Header con Controlli */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div>
                <h3 className="text-heading-xl text-chapp-white mb-2">Analytics Dashboard</h3>
                <p className="text-chapp-gray-400">Panoramica delle performance aziendali</p>
              </div>

              {/* Controlli Interattivi */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Filtro Periodo */}
                <div className="relative">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-chapp-white/10 backdrop-blur-sm border border-chapp-white/20 rounded-xl px-4 py-2 text-chapp-white text-body-md focus:ring-2 focus:ring-chapp-accent-blue focus:border-chapp-accent-blue transition-all duration-300"
                  >
                    {periods.map(period => (
                      <option key={period.value} value={period.value} className="bg-chapp-dark-card text-chapp-white">
                        {period.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro Regione */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-chapp-white/10 backdrop-blur-sm border border-chapp-white/20 rounded-xl px-4 py-2 text-chapp-white text-body-md focus:ring-2 focus:ring-chapp-accent-blue focus:border-chapp-accent-blue transition-all duration-300"
                  >
                    {regions.map(region => (
                      <option key={region.value} value={region.value} className="bg-chapp-dark-card text-chapp-white">
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pulsante Refresh */}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 bg-chapp-accent-blue/20 hover:bg-chapp-accent-blue/30 border border-chapp-accent-blue/40 text-chapp-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  Aggiorna
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {[
                { 
                  icon: DollarSign, 
                  label: 'Fatturato', 
                  value: `€${data.revenue.toLocaleString()}`, 
                  change: data.growth,
                  color: 'text-green-400'
                },
                { 
                  icon: Users, 
                  label: 'Utenti Attivi', 
                  value: data.users.toLocaleString(), 
                  change: '+5.2%',
                  color: 'text-blue-400'
                },
                { 
                  icon: TrendingUp, 
                  label: 'Conversioni', 
                  value: '23.4%', 
                  change: '+2.1%',
                  color: 'text-purple-400'
                },
                { 
                  icon: BarChart3, 
                  label: 'Ordini', 
                  value: data.orders.toLocaleString(), 
                  change: '+8.7%',
                  color: 'text-orange-400'
                }
              ].map((kpi, index) => {
                const IconComponent = kpi.icon;
                return (
                  <div
                    key={index}
                    className={`bg-chapp-white/5 backdrop-blur-sm border border-chapp-white/10 rounded-2xl p-6 hover:bg-chapp-white/10 transition-all duration-500 hover:scale-105 ${animateCharts ? 'animate-pulse' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent size={24} className={kpi.color} />
                      <span className="text-green-400 text-body-sm font-medium">{kpi.change}</span>
                    </div>
                    <div className="text-heading-lg text-chapp-white font-semibold mb-1">
                      {kpi.value}
                    </div>
                    <div className="text-chapp-gray-400 text-body-sm">
                      {kpi.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart */}
              <div className="lg:col-span-2 bg-chapp-white/5 backdrop-blur-sm border border-chapp-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-heading-md text-chapp-white">Trend Vendite</h4>
                  <button className="text-chapp-gray-400 hover:text-chapp-white transition-colors">
                    <Download size={16} />
                  </button>
                </div>
                
                <div className="h-48 flex items-end justify-between gap-2">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full bg-gradient-to-t from-chapp-accent-blue to-chapp-accent-blue-light rounded-t-lg transition-all duration-1000 ${animateCharts ? 'animate-bounce' : ''}`}
                        style={{ 
                          height: `${item.value}%`,
                          animationDelay: `${index * 0.1}s`
                        }}
                      ></div>
                      <span className="text-chapp-gray-400 text-body-sm mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut Chart Mockup */}
              <div className="bg-chapp-white/5 backdrop-blur-sm border border-chapp-white/10 rounded-2xl p-6">
                <h4 className="text-heading-md text-chapp-white mb-6">Distribuzione Canali</h4>
                
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className={`w-full h-full rounded-full border-8 border-chapp-accent-blue/30 border-t-chapp-accent-blue transition-all duration-1000 ${animateCharts ? 'animate-spin' : ''}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-heading-lg text-chapp-white font-semibold">67%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Online', value: '67%', color: 'bg-chapp-accent-blue' },
                    { label: 'Retail', value: '25%', color: 'bg-chapp-accent-blue/60' },
                    { label: 'Partner', value: '8%', color: 'bg-chapp-accent-blue/30' }
                  ].map((channel, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${channel.color}`}></div>
                        <span className="text-chapp-gray-300 text-body-sm">{channel.label}</span>
                      </div>
                      <span className="text-chapp-white text-body-sm font-medium">{channel.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Dashboard */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-chapp-white/10">
              <p className="text-chapp-gray-400 text-body-sm">
                Ultimo aggiornamento: {new Date().toLocaleString('it-IT')}
              </p>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-chapp-gray-300 text-body-sm">Dati in tempo reale</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-on-scroll">
            <button className="btn-chapp-primary hover-glow-blue">
              Richiedi una Demo Personalizzata
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappBIDashboard;
