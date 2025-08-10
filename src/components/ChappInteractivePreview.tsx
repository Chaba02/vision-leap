
import React, { useState } from 'react';
import { Monitor, Smartphone, BarChart3, Code, Zap, Eye } from 'lucide-react';

const ChappInteractivePreview = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { 
      id: 'dashboard', 
      name: 'BI Dashboard', 
      icon: BarChart3,
      description: 'Analytics e reportistica avanzata'
    },
    { 
      id: 'webapp', 
      name: 'Web App', 
      icon: Monitor,
      description: 'Applicazioni web moderne e responsive'
    },
    { 
      id: 'mobile', 
      name: 'Mobile App', 
      icon: Smartphone,
      description: 'App native per iOS e Android'
    }
  ];

  const handleDemoPlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const renderPreviewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-chapp-white/5 rounded-xl border border-chapp-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-chapp-gray-300 text-sm">Dashboard Analytics</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-chapp-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-chapp-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-chapp-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-chapp-white/5 rounded-xl p-4 border border-chapp-white/10">
                <div className="h-24 bg-gradient-to-r from-chapp-accent-blue/20 to-chapp-accent-blue/5 rounded-lg relative overflow-hidden">
                  <div className={`absolute bottom-0 left-0 w-full h-16 bg-chapp-accent-blue/30 rounded-lg transition-all duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                </div>
                <div className="mt-2 text-xs text-chapp-gray-400">Revenue Growth</div>
              </div>
              <div className="bg-chapp-white/5 rounded-xl p-4 border border-chapp-white/10">
                <div className="h-24 flex items-end space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`bg-chapp-accent-blue/40 rounded-t transition-all duration-300 ${isPlaying ? 'animate-bounce' : ''}`}
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`, 
                        width: '10px',
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-chapp-gray-400">User Activity</div>
              </div>
            </div>
          </div>
        );

      case 'webapp':
        return (
          <div className="space-y-4">
            {/* Browser Header */}
            <div className="flex items-center space-x-3 p-3 bg-chapp-white/5 rounded-xl border border-chapp-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-chapp-white/10 rounded-lg px-3 py-1 text-xs text-chapp-gray-400">
                https://app.chapp.com
              </div>
            </div>

            {/* Web App Interface */}
            <div className="bg-chapp-white/5 rounded-xl p-4 border border-chapp-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className={`w-16 h-6 bg-chapp-accent-blue/30 rounded ${isPlaying ? 'animate-pulse' : ''}`}></div>
                  <div className="w-12 h-6 bg-chapp-white/10 rounded"></div>
                  <div className="w-14 h-6 bg-chapp-white/10 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-chapp-accent-blue/20 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-16 bg-chapp-white/10 rounded-lg transition-all duration-500 hover:bg-chapp-white/20 ${isPlaying && i % 2 === 0 ? 'scale-105' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'mobile':
        return (
          <div className="flex justify-center">
            <div className="w-32 h-64 bg-chapp-dark-card/80 rounded-3xl border-2 border-chapp-white/20 p-2 shadow-glass-dark">
              {/* Mobile Screen */}
              <div className="w-full h-full bg-chapp-white/5 rounded-2xl p-3 space-y-3">
                {/* Status Bar */}
                <div className="flex justify-between items-center">
                  <div className="text-xs text-chapp-gray-400">9:41</div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-2 bg-chapp-white/30 rounded-sm"></div>
                    <div className="w-1 h-2 bg-chapp-white/30 rounded-sm"></div>
                  </div>
                </div>

                {/* App Content */}
                <div className="space-y-2">
                  <div className={`w-full h-8 bg-chapp-accent-blue/30 rounded-lg ${isPlaying ? 'animate-pulse' : ''}`}></div>
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-12 bg-chapp-white/10 rounded-lg transition-all duration-300 ${isPlaying ? 'hover:bg-chapp-accent-blue/20' : ''}`}
                      ></div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-chapp-white/10 rounded"
                        style={{ width: `${100 - i * 20}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="section-chapp bg-gradient-to-b from-chapp-dark-bg to-chapp-night-blue/20">
      <div className="container-chapp">
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-6 border border-chapp-white/20">
            <Code className="w-4 h-4" />
            Preview Interattiva
          </div>
          
          <h2 className="text-display-lg text-chapp-title mb-6">
            Scopri le nostre{' '}
            <span className="bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-blue-light bg-clip-text text-transparent">
              soluzioni
            </span>{' '}
            in azione
          </h2>
          
          <p className="text-body-xl text-chapp-body max-w-3xl mx-auto">
            Esplora i nostri progetti attraverso mockup interattivi e vedi come trasformiamo le idee in soluzioni concrete e innovative.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-on-scroll">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-chapp-accent-blue/20 border-chapp-accent-blue/40 text-chapp-white shadow-glow-blue'
                      : 'bg-chapp-white/5 border-chapp-white/20 text-chapp-gray-300 hover:bg-chapp-white/10 hover:text-chapp-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <div className="text-left">
                    <div className="text-body-lg font-medium">{tab.name}</div>
                    <div className="text-body-sm text-chapp-gray-400">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview Container */}
          <div className="card-glass-dark p-8 animate-on-scroll">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-chapp-accent-blue" />
                <span className="text-heading-md text-chapp-white">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </span>
              </div>
              
              <button
                onClick={handleDemoPlay}
                className={`flex items-center space-x-2 btn-chapp-small transition-all duration-300 ${
                  isPlaying ? 'animate-pulse bg-chapp-accent-blue-dark' : 'hover-glow-blue'
                }`}
                disabled={isPlaying}
              >
                <Eye size={16} />
                <span>{isPlaying ? 'In riproduzione...' : 'Avvia Demo'}</span>
              </button>
            </div>

            {/* Preview Content */}
            <div className="min-h-[300px] transition-all duration-500">
              {renderPreviewContent()}
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

export default ChappInteractivePreview;
