import type { TechnologyNode, Sector } from '../../types';
import { sectors } from '../../data/mockData';
import { AlertCircle, Zap, Target, Clock, Activity } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  node: TechnologyNode | null;
}

export function BriefingCard({ node }: Props) {
  if (!node) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-white/50 rounded-2xl border border-dashed border-slate-300 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-sm">
          <Target className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Select a Technology</h3>
        <p className="text-slate-500 max-w-sm">
          Click on any node in the Technology Radar to view its detailed briefing, including signals of change, implications, and future questions.
        </p>
      </div>
    );
  }

  const category = sectors.find((s: Sector) => s.id === node.categoryId);
  
  // Create stars array for importance
  const stars = Array.from({ length: 5 }).map((_, i) => i < node.importance);

  return (
    <div className="h-full w-full bg-white/80 rounded-2xl border border-white/60 overflow-hidden flex flex-col shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Card Header */}
      <div 
        className="px-6 py-5 border-b border-slate-100 relative overflow-hidden bg-white/50"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundColor: category?.color }} />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border border-current"
              style={{ color: category?.color }}
            >
              {category?.name}
            </span>
            <div className="flex gap-1" title={`Importance: ${node.importance}/5`}>
              {stars.map((filled, i) => (
                <div key={i} className={clsx("w-2.5 h-2.5 rounded-full", filled ? `bg-[${category?.color}]` : "bg-slate-200")} style={{ backgroundColor: filled ? category?.color : undefined }} />
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {node.name}
          </h2>
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Timeframe: <strong className="text-slate-700">{node.timeframe} Years</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
        
        {/* Signals */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Signals: What's Known?
          </h3>
          <ul className="space-y-3">
            {node.signals.map((signal, idx) => (
              <li key={idx} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Implications */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Implications: So what?
          </h3>
          <ul className="space-y-3">
            {node.implications.map((imp, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 font-medium text-sm leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                <span className="shrink-0 mt-0.5 text-amber-600">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Futures Questions */}
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            <AlertCircle className="w-5 h-5 text-purple-500" />
            Futures Questions: What If?
          </h3>
          <div className="space-y-3">
            {node.questions.map((q, idx) => (
              <div key={idx} className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-500 pl-4 py-2 text-slate-700 italic font-medium">
                "{q}"
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
