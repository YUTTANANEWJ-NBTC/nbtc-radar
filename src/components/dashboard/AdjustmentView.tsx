import { useState } from 'react';
import { RadarChart } from '../radar/RadarChart';
import { EditableBriefingCard } from './EditableBriefingCard';
import type { TechnologyNode } from '../../types';

interface Props {
  initialData: TechnologyNode[];
  onConfirm: (data: TechnologyNode[]) => void;
  onCancel: () => void;
}

export function AdjustmentView({ initialData, onConfirm, onCancel }: Props) {
  const [draftData, setDraftData] = useState<TechnologyNode[]>(initialData);
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);

  const handleNodeUpdate = (updatedNode: TechnologyNode) => {
    setDraftData((prev) => prev.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    if (selectedNode?.id === updatedNode.id) {
      setSelectedNode(updatedNode);
    }
  };

  return (
    <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="lg:col-span-12 flex justify-between items-center gap-4 bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800">Adjustment Mode: Drag Points & Edit Texts</h3>
        <div className="flex gap-4">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors border border-slate-300 bg-white shadow-sm"
          >
            Discard Changes
          </button>
          <button 
            onClick={() => onConfirm(draftData)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md transition-colors"
          >
            Confirm Locations & Updates
          </button>
        </div>
      </div>
      
      {/* Left: Interactive Radar Chart (7 columns) */}
      <div className="lg:col-span-7 bg-white/40 rounded-3xl border border-white/50 p-6 shadow-xl backdrop-blur-md relative overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <RadarChart 
          data={draftData}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          onNodeUpdate={handleNodeUpdate}
          isInteractive={true}
        />
      </div>

      {/* Right: Editable Briefing Card (5 columns) */}
      <div className="lg:col-span-5 h-[500px] lg:h-[700px] sticky top-8">
        <EditableBriefingCard 
          node={selectedNode} 
          onNodeUpdate={handleNodeUpdate} 
        />
      </div>
    </div>
  );
}
