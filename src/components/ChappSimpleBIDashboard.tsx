
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, DollarSign, Activity, RefreshCw, Download
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const ChappSimpleBIDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Chart configurations
  const revenueChartConfig = {
    value: {
      label: "Fatturato",
      color: "#3b82f6",
    },
  };

  const pieChartConfig = {
    "Web-App": {
      label: "Sviluppo Web-App",
      color: "#3b82f6",
    },
    "BI": {
      label: "Business Intelligence", 
      color: "#10b981",
    },
    "Consulenza": {
      label: "Consulenza",
      color: "#f59e0b",
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

  const distributionData = [
    { name: 'Web-App', value: 45, amount: 225000, color: '#3b82f6' },
    { name: 'BI', value: 35, amount: 175000, color: '#10b981' },
    { name: 'Consulenza', value: 20, amount: 100000, color: '#f59e0b' }
  ];

  const kpiData = [
    { 
      title: 'Fatturato Totale', 
      value: '€500K', 
      trend: '+12.5%', 
      icon: DollarSign, 
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    { 
      title: 'Progetti Attivi', 
      value: '24', 
      trend: '+6 nuovi', 
      icon: Activity, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    { 
      title: 'Clienti Soddisfatti', 
      value: '98%', 
      trend: '+3%', 
      icon: Users, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <section className="section-chapp bg-gradient-to-b from-chapp-dark-bg to-chapp-night-blue/20">
      <div className="container-chapp">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-6 border border-chapp-white/20">
            <Activity className="w-4 h-4" />
            Demo Business Intelligence
          </div>
          
          <h2 className="text-display-lg text-chapp-title mb-6">
            Dashboard{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Intelligente
            </span>
          </h2>
          
          <p className="text-body-xl text-chapp-body max-w-2xl mx-auto">
            Un esempio delle dashboard che creiamo per i nostri clienti. 
            Dati in tempo reale, visualizzazioni chiare, decisioni informate.
          </p>
        </div>

        <div className="max-w-6xl mx-auto animate-on-scroll">
          {/* Dashboard Container */}
          <div className="card-glass-dark p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-chapp-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chapp-accent-blue rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <span className="text-heading-md text-chapp-white font-semibold">Dashboard Aziendale</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="btn-chapp-small"
                >
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  {isRefreshing ? 'Aggiornamento...' : 'Aggiorna'}
                </button>
                <button className="btn-chapp-small">
                  <Download size={16} />
                  Esporta
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div
                  key={index}
                  className="dashboard-card p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                      <kpi.icon size={24} className={kpi.color} />
                    </div>
                    <span className="text-green-400 text-body-sm font-medium">
                      {kpi.trend}
                    </span>
                  </div>
                  <div className="text-heading-xl text-chapp-white font-bold mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-chapp-gray-400 text-body-sm">
                    {kpi.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend Chart */}
              <div className="dashboard-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-heading-md text-chapp-white">Andamento Fatturato</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-chapp-gray-300 text-body-sm">Live</span>
                  </div>
                </div>
                
                <div className="h-64">
                  <ChartContainer config={revenueChartConfig}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value) => [`€${(value / 1000).toFixed(0)}K`, 'Fatturato']}
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

              {/* Distribution Pie Chart */}
              <div className="dashboard-card p-6">
                <h4 className="text-heading-md text-chapp-white mb-6">Distribuzione Servizi</h4>
                
                <div className="h-64">
                  <ChartContainer config={pieChartConfig}>
                    <RechartsPieChart>
                      <RechartsPieChart 
                        data={distributionData} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        dataKey="value"
                      >
                        {distributionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth={1}
                          />
                        ))}
                      </RechartsPieChart>
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload[0]) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-black/80 border border-white/20 rounded-lg p-3">
                                <p className="text-white font-medium">{data.name}</p>
                                <p className="text-blue-400">€{(data.amount / 1000).toFixed(0)}K</p>
                                <p className="text-gray-300">{data.value}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </RechartsPieChart>
                  </ChartContainer>
                </div>

                <div className="space-y-3 mt-4">
                  {distributionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-chapp-gray-300 text-body-sm">{item.name}</span>
                      </div>
                      <span className="text-chapp-white text-body-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-chapp-white/10">
              <p className="text-chapp-gray-400 text-body-sm mb-4 sm:mb-0">
                Ultimo aggiornamento: {new Date().toLocaleString('it-IT')}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-chapp-gray-300 text-body-sm">Dati in tempo reale</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 animate-on-scroll">
            <button className="btn-chapp-primary hover-glow-blue">
              Richiedi una Demo Personalizzata
            </button>
            <p className="text-chapp-gray-400 text-body-sm mt-4">
              Scopri come possiamo creare soluzioni simili per il tuo business
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappSimpleBIDashboard;
