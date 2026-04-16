import { useState } from 'react';
import { RadarChart } from '../radar/RadarChart';
import { EditableBriefingCard } from './EditableBriefingCard';
import type { TechnologyNode, Sector } from '../../types';
import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  initialData: TechnologyNode[];
  sectors: Sector[];
  onConfirm: (data: TechnologyNode[]) => void;
  onCancel: () => void;
}

export function AdjustmentView({ initialData, sectors, onConfirm, onCancel }: Props) {
  const [draftData, setDraftData] = useState<TechnologyNode[]>(initialData);
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);

  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleNodeUpdate = (updatedNode: TechnologyNode) => {
    setDraftData((prev) => prev.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    if (selectedNode?.id === updatedNode.id) {
      setSelectedNode(updatedNode);
    }
  };

  const handleConfirmClick = () => {
    setShowPasswordPrompt(true);
    setPasswordInput('');
    setPasswordError(false);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === '12345') {
      setShowPasswordPrompt(false);
      onConfirm(draftData);
    } else {
      setPasswordError(true);
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
            onClick={handleConfirmClick}
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
          sectors={sectors}
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
          sectors={sectors}
          onNodeUpdate={handleNodeUpdate} 
        />
      </div>

      {/* Floating Clear Selection at Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setSelectedNode(null)}
          disabled={!selectedNode}
          className={clsx(
            "flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg border backdrop-blur-md font-semibold text-sm transition-all duration-300",
            selectedNode
              ? "bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5"
              : "bg-white/50 border-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          <RefreshCw className={clsx("w-4 h-4", selectedNode && "text-blue-500")} /> 
          Clear Selection
        </button>
      </div>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Security Confirmation</h3>
            <p className="text-sm text-slate-600 mb-6">Enter password to apply your mocked adjustments to the main dashboard.</p>
            
            <input 
              type="password" 
              autoFocus
              value={passwordInput}
              onChange={e => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handlePasswordSubmit();
                if (e.key === 'Escape') setShowPasswordPrompt(false);
              }}
              placeholder="Enter password..."
              className={clsx(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                passwordError ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-purple-500"
              )}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2 font-medium">Incorrect password. Please try again.</p>
            )}
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowPasswordPrompt(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={handlePasswordSubmit}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md transition-colors"
              >
                Unlock & Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
