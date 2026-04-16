import { useState } from 'react';
import type { TechnologyNode, Sector } from '../../types';
import { AlertCircle, Zap, Target, Clock, Activity, Plus, X, Edit2, Check } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  node: TechnologyNode | null;
  sectors: Sector[];
  onNodeUpdate: (node: TechnologyNode) => void;
}

export function EditableBriefingCard({ node, sectors, onNodeUpdate }: Props) {
  const [newSignal, setNewSignal] = useState('');
  const [newImplication, setNewImplication] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const [addingField, setAddingField] = useState<'signals' | 'implications' | 'questions' | null>(null);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingNameValue, setEditingNameValue] = useState('');

  if (!node) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-white/50 rounded-2xl border border-dashed border-slate-300 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-slate-200 shadow-sm">
          <Target className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Select a Technology</h3>
        <p className="text-slate-500 max-w-sm">
          Click on any node in the Technology Radar to view its detailed briefing, including signals of change, implications, and considerations.
        </p>
      </div>
    );
  }

  const handleAddItem = (field: 'signals' | 'implications' | 'questions', value: string) => {
    if (!value.trim()) return;
    onNodeUpdate({
      ...node,
      [field]: [...node[field], value.trim()]
    });
    // reset input
    if (field === 'signals') setNewSignal('');
    if (field === 'implications') setNewImplication('');
    if (field === 'questions') setNewQuestion('');
    setAddingField(null);
  };

  const handleRemoveItem = (field: 'signals' | 'implications' | 'questions', index: number) => {
    const updated = [...node[field]];
    updated.splice(index, 1);
    onNodeUpdate({
      ...node,
      [field]: updated
    });
  };

  const category = sectors.find((s: Sector) => s.id === node.categoryId);
  const stars = Array.from({ length: 5 }).map((_, i) => i < node.importance);

  return (
    <div className="h-full w-full bg-white/80 rounded-2xl border border-white/60 overflow-hidden flex flex-col shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Card Header */}
      <div className="px-6 py-5 border-b border-slate-100 relative overflow-hidden bg-white/50">
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
          <div className="flex items-center gap-2 group/title w-full mt-2">
            {isEditingName ? (
              <div className="flex-1 flex gap-2 items-center">
                <input 
                  type="text" 
                  autoFocus
                  value={editingNameValue}
                  onChange={(e) => setEditingNameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNodeUpdate({ ...node, name: editingNameValue });
                      setIsEditingName(false);
                    }
                    if (e.key === 'Escape') setIsEditingName(false);
                  }}
                  className="w-full text-2xl font-bold text-slate-900 tracking-tight leading-snug border-b-2 border-blue-500 bg-transparent focus:outline-none"
                />
                <button 
                  onClick={() => {
                    onNodeUpdate({ ...node, name: editingNameValue });
                    setIsEditingName(false);
                  }}
                  className="p-1.5 text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                >
                  <Check className="w-5 h-5"/>
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {node.name}
                </h2>
                <button 
                  onClick={() => {
                    setEditingNameValue(node.name);
                    setIsEditingName(true);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md opacity-0 group-hover/title:opacity-100 transition-all"
                  title="Edit Technology Name"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
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
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <Activity className="w-5 h-5 text-blue-500" />
              Signals: What's Known?
            </h3>
            <button 
              onClick={() => setAddingField(addingField === 'signals' ? null : 'signals')}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors font-medium text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          
          <ul className="space-y-3">
            {node.signals.map((signal, idx) => (
              <li key={idx} className="flex justify-between items-start gap-3 group text-slate-600 text-sm leading-relaxed">
                <div className="flex gap-3 items-start">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{signal}</span>
                </div>
                <button 
                  onClick={() => handleRemoveItem('signals', idx)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>

          {addingField === 'signals' && (
            <div className="mt-3 flex gap-2">
              <input 
                autoFocus
                type="text" 
                value={newSignal}
                onChange={e => setNewSignal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddItem('signals', newSignal) }}
                placeholder="Type a new signal..."
                className="flex-1 text-sm rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button 
                onClick={() => handleAddItem('signals', newSignal)}
                className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </section>

        {/* Implications */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <Zap className="w-5 h-5 text-amber-500" />
              Implications: So what?
            </h3>
            <button 
              onClick={() => setAddingField(addingField === 'implications' ? null : 'implications')}
              className="p-1 text-amber-600 hover:bg-amber-50 rounded-full transition-colors font-medium text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <ul className="space-y-3">
            {node.implications.map((imp, idx) => (
              <li key={idx} className="flex justify-between items-start gap-3 text-slate-700 font-medium text-sm leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 group">
                <div className="flex gap-3 items-start">
                  <span className="shrink-0 mt-0.5 text-amber-600">→</span>
                  <span>{imp}</span>
                </div>
                <button 
                  onClick={() => handleRemoveItem('implications', idx)}
                  className="opacity-0 group-hover:opacity-100 text-amber-600/50 hover:text-red-500 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          {addingField === 'implications' && (
            <div className="mt-3 flex gap-2">
              <input 
                autoFocus
                type="text" 
                value={newImplication}
                onChange={e => setNewImplication(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddItem('implications', newImplication) }}
                placeholder="Type a new implication..."
                className="flex-1 text-sm rounded-lg border border-amber-300 px-3 py-1.5 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <button 
                onClick={() => handleAddItem('implications', newImplication)}
                className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </section>

        {/* Futures Questions */}
        <section>
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800">
              <AlertCircle className="w-5 h-5 text-purple-500" />
              Considerations : What if?
            </h3>
            <button 
              onClick={() => setAddingField(addingField === 'questions' ? null : 'questions')}
              className="p-1 text-purple-600 hover:bg-purple-50 rounded-full transition-colors font-medium text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {node.questions.map((q, idx) => (
              <div key={idx} className="flex justify-between items-start bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-500 pl-4 pr-2 py-2 group">
                <span className="text-slate-700 italic font-medium mt-0.5">"{q}"</span>
                <button 
                  onClick={() => handleRemoveItem('questions', idx)}
                  className="opacity-0 group-hover:opacity-100 text-purple-600/50 hover:text-red-500 transition-opacity shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {addingField === 'questions' && (
            <div className="mt-3 flex gap-2">
              <input 
                autoFocus
                type="text" 
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddItem('questions', newQuestion) }}
                placeholder="Type a new consideration..."
                className="flex-1 text-sm rounded-lg border border-purple-300 px-3 py-1.5 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <button 
                onClick={() => handleAddItem('questions', newQuestion)}
                className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
