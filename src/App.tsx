import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { RadarChart } from './components/radar/RadarChart';
import { BriefingCard } from './components/dashboard/BriefingCard';
import { AdjustmentView } from './components/dashboard/AdjustmentView';
import { mockData } from './data/mockData';
import type { TechnologyNode } from './types';
import clsx from 'clsx';

type ViewMode = 'main' | 'adjust';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [data, setData] = useState<TechnologyNode[]>(() => {
    const saved = localStorage.getItem('radarData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockData;
      }
    }
    return mockData;
  });

  useEffect(() => {
    localStorage.setItem('radarData', JSON.stringify(data));
  }, [data]);

  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 font-sans selection:bg-purple-500/30 pb-24">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-[calc(100vh-2rem)] flex flex-col relative w-full">
        
        {currentView === 'main' ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            <div className="lg:col-span-7 bg-white/40 rounded-3xl border border-white/50 p-6 shadow-xl backdrop-blur-md relative overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <RadarChart 
                data={data} 
                selectedNode={selectedNode} 
                onNodeSelect={setSelectedNode} 
                isInteractive={false}
              />
            </div>

            <div className="lg:col-span-5 h-[500px] lg:h-[700px] sticky top-24">
              <BriefingCard node={selectedNode} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex w-full">
            <AdjustmentView 
              initialData={data} 
              onConfirm={(newData) => {
                setData(newData);
                setCurrentView('main');
              }}
              onCancel={() => setCurrentView('main')}
            />
          </div>
        )}

      </main>

      {/* Floating View Switcher at Bottom Right */}
      <div className="fixed bottom-6 right-6 flex bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-2xl border border-white/60 z-50">
        <button
          onClick={() => setCurrentView('main')}
          className={clsx(
            "px-6 py-3 font-semibold text-sm rounded-lg transition-all",
            currentView === 'main' ? "bg-slate-800 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          View Dashboard
        </button>
        <button
          onClick={() => setCurrentView('adjust')}
          className={clsx(
            "px-6 py-3 font-semibold text-sm rounded-lg transition-all",
            currentView === 'adjust' ? "bg-purple-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          Mockup Adjustments
        </button>
      </div>

    </div>
  );
}

export default App;
