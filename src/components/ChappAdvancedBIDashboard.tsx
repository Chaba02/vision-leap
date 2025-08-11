
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, Filter, Calendar, Download, RefreshCw,
  Briefcase, Star, Clock, Menu, Search, Bell, Settings, FileText, PieChart,
  ArrowUp, ArrowDown, Activity, Zap, Eye, ChevronDown, X
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const ChappAdvancedBIDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30-days');
  const [selectedCategories, setSelectedCategories] = useState(['sales', 'marketing']);
  const [budgetRange, setBudgetRange] = useState([10, 500]);
  const [activeToggles, setActiveToggles] = useState({ active: true, archived: false, realtime: true });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(false);

  // Mock data that updates based on filters
  const generateRevenueData = () => {
    const baseData = [
      { month: 'Gen', value: 125000 },
      { month: 'Feb', value: 142000 },
      { month: 'Mar', value: 138000 },
      { month: 'Apr', value: 165000 },
      { month: 'Mag', value: 178000 },
      { month: 'Giu', value: 195000 },
      { month: 'Lug', value: 187000 },
      { month: 'Ago', value: 210000 }
    ];
    
    const multiplier = selectedDateRange === 'year' ? 1.2 : selectedDateRange === '7-days' ? 0.3 : 1;
    return baseData.map(item => ({ ...item, value: Math.round(item.value * multiplier) }));
  };

  const generatePerformanceData = () => [
    { sector: 'E-commerce', performance: 85, budget: 75000 },
    { sector: 'SaaS', performance: 92, budget: 120000 },
    { sector: 'Manifattura', performance: 78, budget: 95000 },
    { sector: 'Servizi', performance: 88, budget: 110000 },
    { sector: 'Retail', performance: 81, budget: 65000 },
    { sector: 'Fintech', performance: 94, budget: 140000 }
  ];

  const generateTrafficData = () => [
    { day: '1', users: 15000, sessions: 18000, conversions: 1200 },
    { day: '5', users: 16500, sessions: 19800, conversions: 1350 },
    { day: '10', users: 18200, sessions: 22400, conversions: 1480 },
    { day: '15', users: 19800, sessions: 24200, conversions: 1620 },
    { day: '20', users: 20500, sessions: 26100, conversions: 1750 },
    { day: '25', users: 21200, sessions: 27300, conversions: 1690 },
    { day: '30', users: 22000, sessions: 28000, conversions: 1800 }
  ];

  const pieData = [
    { name: 'Sviluppo Web-App', value: 35, amount: 175000, color: '#2563eb' },
    { name: 'Business Intelligence', value: 28, amount: 140000, color: '#3b82f6' },
    { name: 'Consulenza Strategica', value: 22, amount: 110000, color: '#10b981' },
    { name: 'Manutenzione & Support', value: 10, amount: 50000, color: '#f59e0b' },
    { name: 'R&D Innovazione', value: 5, amount: 25000, color: '#8b5cf6' }
  ];

  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const performanceData = generatePerformanceData();
  const trafficData = generateTrafficData();

  useEffect(() => {
    setRevenueData(generateRevenueData());
    setAnimateCharts(true);
    setTimeout(() => setAnimateCharts(false), 1000);
  }, [selectedDateRange, selectedCategories, budgetRange]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRevenueData(generateRevenueData());
      setIsRefreshing(false);
      setAnimateCharts(true);
      setTimeout(() => setAnimateCharts(false), 1000);
    }, 1500);
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Oggi' },
    { value: '7-days', label: '7 giorni' },
    { value: '30-days', label: '30 giorni' },
    { value: '3-months', label: '3 mesi' }
  ];

  const categoryOptions = [
    { value: 'sales', label: 'Vendite' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'production', label: 'Produzione' },
    { value: 'hr', label: 'HR' }
  ];

  const kpiCards = [
    { 
      title: 'Total Revenue', 
      value: '€1.2M', 
      trend: '+12.5%', 
      icon: DollarSign, 
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    { 
      title: 'Active Projects', 
      value: '47', 
      trend: '+8 nuovi', 
      icon: Briefcase, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    { 
      title: 'Client Satisfaction', 
      value: '4.8/5.0', 
      trend: '+0.2', 
      icon: Star, 
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    { 
      title: 'Avg Delivery Time', 
      value: '28 giorni', 
      trend: '-5 giorni', 
      icon: Clock, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <section className="section-chapp bg-gradient-to-b from-chapp-dark-bg to-chapp-night-blue/20">
      <div className="container-chapp">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-6 border border-chapp-white/20">
            <Activity className="w-4 h-4" />
            Demo Interattiva Avanzata
          </div>
          
          <h2 className="text-display-lg text-chapp-title mb-6">
            Dashboard{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Business Intelligence
            </span>{' '}
            Completa
          </h2>
          
          <p className="text-body-xl text-chapp-body max-w-3xl mx-auto">
            Esplora una dashboard BI completamente funzionale con filtri avanzati, grafici interattivi e aggiornamenti real-time. 
            Un esempio concreto delle nostre capacità di sviluppo.
          </p>
        </div>

        <div className="max-w-full mx-auto animate-on-scroll">
          {/* Main Dashboard Container */}
          <div className="card-glass-dark overflow-hidden">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between p-6 border-b border-chapp-white/10">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-chapp-white/10 rounded-xl transition-colors"
                >
                  <Menu size={20} className="text-chapp-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chapp-accent-blue rounded-lg flex items-center justify-center">
                    <BarChart3 size={18} className="text-white" />
                  </div>
                  <span className="text-heading-md text-chapp-white font-semibold">Analytics Pro</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chapp-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Cerca..."
                    className="bg-chapp-white/10 border border-chapp-white/20 rounded-xl pl-10 pr-4 py-2 text-chapp-white placeholder-chapp-gray-400 text-body-sm focus:ring-2 focus:ring-chapp-accent-blue focus:border-chapp-accent-blue transition-all duration-300"
                  />
                </div>
                <button className="p-2 hover:bg-chapp-white/10 rounded-xl transition-colors relative">
                  <Bell size={18} className="text-chapp-gray-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-blue-light rounded-full"></div>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-chapp-white/10 transition-all duration-300`}>
                <nav className="p-4 space-y-2">
                  {[
                    { icon: BarChart3, label: 'Dashboard', active: true },
                    { icon: TrendingUp, label: 'Analytics', active: false },
                    { icon: FileText, label: 'Reports', active: false },
                    { icon: Settings, label: 'Settings', active: false }
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                        item.active 
                          ? 'bg-chapp-accent-blue/20 text-chapp-white border border-chapp-accent-blue/40' 
                          : 'text-chapp-gray-300 hover:bg-chapp-white/10 hover:text-chapp-white'
                      }`}
                    >
                      <item.icon size={18} />
                      {!sidebarCollapsed && <span className="text-body-md">{item.label}</span>}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Advanced Filters Bar */}
                <div className="bg-chapp-white/5 backdrop-blur-sm border border-chapp-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Date Range Picker */}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-chapp-gray-400" />
                      <select
                        value={selectedDateRange}
                        onChange={(e) => setSelectedDateRange(e.target.value)}
                        className="filter-select px-4 py-2 text-body-md"
                      >
                        {dateRangeOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-chapp-dark-card text-chapp-white">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category Multi-Select */}
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-chapp-gray-400" />
                      <div className="relative">
                        <select className="filter-select px-4 py-2 text-body-md">
                          <option>Categorie selezionate</option>
                        </select>
                        <div className="flex gap-1 mt-2">
                          {selectedCategories.map(cat => (
                            <span key={cat} className="bg-chapp-accent-blue/20 text-chapp-white px-2 py-1 rounded-lg text-body-sm flex items-center gap-1">
                              {categoryOptions.find(c => c.value === cat)?.label}
                              <X size={12} className="cursor-pointer hover:text-red-400" />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Budget Range Slider */}
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-chapp-gray-400" />
                      <div className="flex items-center gap-2">
                        <span className="text-chapp-gray-300 text-body-sm">€{budgetRange[0]}K</span>
                        <div className="w-24 h-2 bg-chapp-white/20 rounded-full relative">
                          <div className="absolute left-2 top-0 w-16 h-2 bg-chapp-accent-blue rounded-full"></div>
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-chapp-accent-blue rounded-full shadow-lg"></div>
                        </div>
                        <span className="text-chapp-gray-300 text-body-sm">€{budgetRange[1]}K</span>
                      </div>
                    </div>

                    {/* Toggle Switches */}
                    <div className="flex items-center gap-4">
                      {[
                        { key: 'active', label: 'Solo attive' },
                        { key: 'realtime', label: 'Real-time' }
                      ].map(toggle => (
                        <label key={toggle.key} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-10 h-6 rounded-full transition-all duration-300 ${
                            activeToggles[toggle.key] ? 'bg-chapp-accent-blue' : 'bg-chapp-gray-600'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 transform ${
                              activeToggles[toggle.key] ? 'translate-x-4' : 'translate-x-0.5'
                            } translate-y-0.5`}></div>
                          </div>
                          <span className="text-chapp-gray-300 text-body-sm">{toggle.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Refresh Button */}
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="btn-chapp-small"
                    >
                      <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                      {isRefreshing ? 'Aggiornamento...' : 'Aggiorna'}
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {kpiCards.map((kpi, index) => (
                    <div
                      key={index}
                      className={`dashboard-card p-6 ${animateCharts ? 'animate-pulse' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                          <kpi.icon size={24} className={kpi.color} />
                        </div>
                        <span className="text-green-400 text-body-sm font-medium flex items-center gap-1">
                          <ArrowUp size={12} />
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Revenue Trend Line Chart */}
                  <div className="lg:col-span-2 dashboard-card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-heading-md text-chapp-white">Revenue Trend</h4>
                      <button className="text-chapp-gray-400 hover:text-chapp-white transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                          <YAxis stroke="rgba(255,255,255,0.6)" />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            contentStyle={{
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '12px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Budget Distribution Pie Chart */}
                  <div className="dashboard-card p-6">
                    <h4 className="text-heading-md text-chapp-white mb-6">Budget Distribution</h4>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <defs>
                            {pieData.map((entry, index) => (
                              <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={entry.color} stopOpacity={0.8}/>
                                <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                              </linearGradient>
                            ))}
                          </defs>
                          <RechartsPieChart 
                            data={pieData} 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={80} 
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={`url(#gradient-${index})`}
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
                                    <p className="text-blue-400">€{data.amount.toLocaleString()}</p>
                                    <p className="text-gray-300">{data.value}%</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2 mt-4">
                      {pieData.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-chapp-gray-300 text-body-sm">{item.name}</span>
                          </div>
                          <span className="text-chapp-white text-body-sm font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Bar Chart & Traffic Area Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Bar Chart */}
                  <div className="dashboard-card p-6">
                    <h4 className="text-heading-md text-chapp-white mb-6">Performance per Settore</h4>
                    
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="sector" stroke="rgba(255,255,255,0.6)" />
                          <YAxis stroke="rgba(255,255,255,0.6)" />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            contentStyle={{
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '12px'
                            }}
                          />
                          <Bar 
                            dataKey="performance" 
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                          />
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6}/>
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Traffic Area Chart */}
                  <div className="dashboard-card p-6">
                    <h4 className="text-heading-md text-chapp-white mb-6">Traffic Analytics</h4>
                    
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trafficData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
                          <YAxis stroke="rgba(255,255,255,0.6)" />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            contentStyle={{
                              backgroundColor: 'rgba(0,0,0,0.8)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '12px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="users" 
                            stackId="1"
                            stroke="#3b82f6" 
                            fill="#3b82f6"
                            fillOpacity={0.3}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="sessions" 
                            stackId="1"
                            stroke="#10b981" 
                            fill="#10b981"
                            fillOpacity={0.3}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="conversions" 
                            stackId="1"
                            stroke="#f59e0b" 
                            fill="#f59e0b"
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-chapp-white/10">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <p className="text-chapp-gray-400 text-body-sm">
                      Ultimo aggiornamento: {new Date().toLocaleString('it-IT')}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-chapp-gray-300 text-body-sm">Real-time</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="btn-chapp-small">
                      <Download size={16} />
                      Export PDF
                    </button>
                    <button className="btn-chapp-small">
                      <FileText size={16} />
                      Export Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 animate-on-scroll">
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

export default ChappAdvancedBIDashboard;
