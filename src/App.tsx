import { useState } from 'react';
import { Header } from './components/layout/Header';
import { RadarChart } from './components/radar/RadarChart';
import { BriefingCard } from './components/dashboard/BriefingCard';
import { mockData } from './data/mockData';
import type { TechnologyNode } from './types';

function App() {
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 font-sans selection:bg-purple-500/30">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-[calc(100vh-2rem)] flex flex-col">
        {/* Top Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">2026 Emerging Technology Radar</h2>
          <p className="text-slate-600 max-w-3xl text-lg">
            Interactive technology foresight dashboard tracking signals of change across telecommunications, 
            audiovisual media, and network AI infrastructure.
          </p>
        </div>

        {/* Dashboard Canvas */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left: Radar Chart (7 columns) */}
          <div className="lg:col-span-7 bg-white/40 rounded-3xl border border-white/50 p-6 shadow-xl backdrop-blur-md relative overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <RadarChart 
              data={mockData} 
              selectedNode={selectedNode} 
              onNodeSelect={setSelectedNode} 
            />
          </div>

          {/* Right: Briefing Card (5 columns) */}
          <div className="lg:col-span-5 h-[500px] lg:h-[700px] sticky top-24">
            <BriefingCard node={selectedNode} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
