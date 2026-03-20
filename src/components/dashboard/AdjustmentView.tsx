import { useState } from 'react';
import { RadarChart } from '../radar/RadarChart';
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
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mr-8">Adjustment Mode</h3>
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
        >
          Discard Changes
        </button>
        <button 
          onClick={() => onConfirm(draftData)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md transition-colors"
        >
          Confirm Locations
        </button>
      </div>
      
      <div className="w-full max-w-[1000px] flex justify-center">
        <RadarChart 
          data={draftData}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          onNodeUpdate={handleNodeUpdate}
          isInteractive={true}
        />
      </div>
    </div>
  );
}
