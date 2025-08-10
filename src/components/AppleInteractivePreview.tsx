
import React, { useState } from 'react';
import { Play, Code, BarChart3, Zap, Monitor, Smartphone } from 'lucide-react';

const AppleInteractivePreview = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { 
      id: 'dashboard', 
      name: 'Dashboard BI', 
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'webapp', 
      name: 'Web App', 
      icon: Monitor,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'mobile', 
      name: 'Mobile', 
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const renderPreviewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden">
            {/* Simulated Dashboard */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="h-8 w-8 bg-blue-100 rounded-lg mb-2 flex items-center justify-center">
                  <BarChart3 size={16} className="text-blue-600" />
                </div>
                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 bg-blue-500 rounded"></div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="h-8 w-8 bg-green-100 rounded-lg mb-2 flex items-center justify-center">
                  <Zap size={16} className="text-green-600" />
                </div>
                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 bg-green-500 rounded"></div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="h-8 w-8 bg-purple-100 rounded-lg mb-2 flex items-center justify-center">
                  <Monitor size={16} className="text-purple-600" />
                </div>
                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 bg-purple-500 rounded"></div>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
                <div className="h-2 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="relative h-32">
                {/* Animated Chart Bars */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end space-x-2">
                  {[40, 70, 30, 90, 60, 80, 45].map((height, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t transition-all duration-1000 delay-${index * 100} ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        height: `${height}%`, 
                        width: '12%',
                        transform: isPlaying ? `scaleY(${Math.random() * 0.5 + 0.75})` : 'scaleY(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating Animation Elements */}
            {isPlaying && (
              <>
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              </>
            )}
          </div>
        );
      
      case 'webapp':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 overflow-hidden">
            {/* Simulated Code Editor */}
            <div className="bg-gray-800 rounded-lg mb-4 p-4">
              <div className="flex space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="flex">
                  <span className="text-gray-500 w-8">1</span>
                  <span className="text-purple-400">import</span>
                  <span className="text-white ml-2">React from 'react'</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8">2</span>
                  <span className="text-blue-400">const</span>
                  <span className="text-yellow-300 ml-2">Dashboard</span>
                  <span className="text-white ml-1">= () => {</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8">3</span>
                  <span className="text-white ml-4">return (</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-8">4</span>
                  <span className="text-green-400 ml-6">&lt;div className="dashboard"&gt;</span>
                </div>
              </div>
            </div>
            
            {/* Preview Window */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className={`h-16 bg-gradient-to-r ${tabs[1].color} rounded-lg transition-all duration-500 ${
                  isPlaying ? 'scale-105 shadow-lg' : ''
                }`}></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Code Animation */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                  <Code size={32} className="text-white animate-spin" />
                </div>
              </div>
            )}
          </div>
        );
      
      case 'mobile':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Phone Mockup */}
            <div className="relative">
              <div className="w-48 h-80 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                    <div className="text-xs font-semibold">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4">
                    <div className="h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4 flex items-center justify-center">
                      <Monitor size={20} className="text-white" />
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gray-300 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Interactive Elements */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl transition-all duration-300 ${
                        isPlaying ? 'scale-95 shadow-lg' : ''
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              {isPlaying && (
                <>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                </>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="section-apple bg-apple-gray-50" id="preview">
      <div className="container-apple">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-lg text-apple-title mb-6">
            Vedi in Azione le Nostre{' '}
            <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
              Soluzioni
            </span>
          </h2>
          <p className="text-body-xl text-apple-body max-w-3xl mx-auto">
            Esplora le nostre piattaforme interattive. Ogni soluzione è progettata 
            per essere intuitiva, potente e completamente personalizzabile.
          </p>
        </div>

        {/* Interactive Preview */}
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-apple-white rounded-2xl p-2 shadow-apple-md">
              <div className="flex space-x-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-apple-black text-apple-white shadow-apple'
                          : 'text-apple-gray-700 hover:text-apple-black hover:bg-apple-gray-50'
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview Window */}
          <div className="relative bg-apple-white rounded-3xl shadow-apple-xl p-8">
            {/* Window Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <button
                onClick={handlePlay}
                className="flex items-center space-x-2 px-4 py-2 bg-apple-black text-apple-white rounded-xl hover:bg-apple-gray-800 transition-colors duration-300 group"
              >
                <Play size={16} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Demo Live</span>
              </button>
            </div>

            {/* Preview Content */}
            <div className="h-96 rounded-2xl overflow-hidden">
              {renderPreviewContent()}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: 'Drag & Drop',
                description: 'Interfaccia intuitiva per creare e modificare dashboard',
                icon: '🎯'
              },
              {
                title: 'Real-time',
                description: 'Aggiornamenti in tempo reale dei tuoi dati business',
                icon: '⚡'
              },
              {
                title: 'Responsive',
                description: 'Ottimizzato per ogni dispositivo e dimensione schermo',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-apple-white rounded-2xl shadow-apple hover-lift transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-heading-md text-apple-title mb-2">{feature.title}</h3>
                <p className="text-body-md text-apple-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppleInteractivePreview;
