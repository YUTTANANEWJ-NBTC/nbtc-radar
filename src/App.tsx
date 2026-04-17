import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { RadarChart } from './components/radar/RadarChart';
import { BriefingCard } from './components/dashboard/BriefingCard';
import { AdjustmentView } from './components/dashboard/AdjustmentView';
import { mockDataV1, mockDataV2, sectorsV1, sectorsV2, defaultTimeframeConfig, dataVersion } from './data/mockData';
import type { TechnologyNode, TimeframeConfig } from './types';
import { RefreshCw, Download } from 'lucide-react';
import clsx from 'clsx';

type ViewMode = 'main' | 'adjust';
type Version = 'v1' | 'v2';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [activeVersion, setActiveVersion] = useState<Version>('v1');
  const [showEntryPrompt, setShowEntryPrompt] = useState(false);
  const [entryPassword, setEntryPassword] = useState('');
  const [entryError, setEntryError] = useState(false);

  const [showExportPrompt, setShowExportPrompt] = useState(false);
  const [exportPassword, setExportPassword] = useState('');
  const [exportError, setExportError] = useState(false);
  
  const [v1Data, setV1Data] = useState<TechnologyNode[]>(() => {
    const savedVersion = localStorage.getItem('radarDataVersion');
    const saved = localStorage.getItem('radarDataV1');
    if (saved && savedVersion && Number(savedVersion) >= dataVersion) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockDataV1;
      }
    }
    return mockDataV1;
  });

  const [v2Data, setV2Data] = useState<TechnologyNode[]>(() => {
    const savedVersion = localStorage.getItem('radarDataVersion');
    const saved = localStorage.getItem('radarDataV2');
    if (saved && savedVersion && Number(savedVersion) >= dataVersion) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockDataV2;
      }
    }
    return mockDataV2;
  });

  const [v1Timeframes, setV1Timeframes] = useState<TimeframeConfig>(() => {
    const savedVersion = localStorage.getItem('radarDataVersion');
    const saved = localStorage.getItem('timeframesV1');
    if (saved && savedVersion && Number(savedVersion) >= dataVersion) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultTimeframeConfig;
      }
    }
    return defaultTimeframeConfig;
  });

  const [v2Timeframes, setV2Timeframes] = useState<TimeframeConfig>(() => {
    const savedVersion = localStorage.getItem('radarDataVersion');
    const saved = localStorage.getItem('timeframesV2');
    if (saved && savedVersion && Number(savedVersion) >= dataVersion) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultTimeframeConfig;
      }
    }
    return defaultTimeframeConfig;
  });

  useEffect(() => {
    localStorage.setItem('radarDataVersion', dataVersion.toString());
  }, []);

  useEffect(() => {
    localStorage.setItem('radarDataV1', JSON.stringify(v1Data));
  }, [v1Data]);

  useEffect(() => {
    localStorage.setItem('radarDataV2', JSON.stringify(v2Data));
  }, [v2Data]);

  useEffect(() => {
    localStorage.setItem('timeframesV1', JSON.stringify(v1Timeframes));
  }, [v1Timeframes]);

  useEffect(() => {
    localStorage.setItem('timeframesV2', JSON.stringify(v2Timeframes));
  }, [v2Timeframes]);

  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);

  const activeData = activeVersion === 'v1' ? v1Data : v2Data;
  const activeSectors = activeVersion === 'v1' ? sectorsV1 : sectorsV2;
  const activeTimeframes = activeVersion === 'v1' ? v1Timeframes : v2Timeframes;

  const handleAdjustClick = () => {
    setShowEntryPrompt(true);
    setEntryPassword('');
    setEntryError(false);
  };

  const submitEntryPassword = () => {
    if (entryPassword === '12345') {
      setShowEntryPrompt(false);
      setCurrentView('adjust');
    } else {
      setEntryError(true);
    }
  };

  const handleExportClick = () => {
    setShowExportPrompt(true);
    setExportPassword('');
    setExportError(false);
  };

  const submitExportPassword = () => {
    if (exportPassword === '12345') {
      setShowExportPrompt(false);
      handleExportData();
    } else {
      setExportError(true);
    }
  };

  const handleExportData = () => {
    const code = `import type { TechnologyNode, Sector, TimeframeConfig } from '../types';

export const dataVersion = ${Date.now()};

export const defaultTimeframeConfig: TimeframeConfig = ${JSON.stringify(v1Timeframes, null, 2)};

export const sectorsV1: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
  { id: 'audiovisual_media', name: 'กลุ่ม Audiovisual media', color: '#1e293b' },
];

export const mockDataV1: TechnologyNode[] = ${JSON.stringify(v1Data, null, 2)};

export const sectorsV2: Sector[] = [
  { id: 'satellite_space', name: 'กลุ่ม Satellite and Space', color: '#1e293b' },
];

export const mockDataV2: TechnologyNode[] = ${JSON.stringify(v2Data, null, 2)};
`;

    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mockData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('ดาวน์โหลดไฟล์ mockData.ts สำเร็จ! \\n\\nนำไฟล์นี้ไปวางทับไฟล์เดิมที่ src/data/mockData.ts เพื่อให้ทุกคนเห็นข้อมูลล่าสุดตรงกันครับ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 font-sans selection:bg-purple-500/30 pb-24">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto min-h-[calc(100vh-2rem)] flex flex-col relative w-full">
        
        {currentView === 'main' ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            <div className="lg:col-span-7 bg-white/40 rounded-3xl border border-white/50 p-6 shadow-xl backdrop-blur-md relative overflow-hidden flex items-center justify-center min-h-[500px] lg:min-h-[700px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <RadarChart 
                data={activeData} 
                sectors={activeSectors}
                timeframes={activeTimeframes}
                selectedNode={selectedNode} 
                onNodeSelect={setSelectedNode} 
                isInteractive={false}
              />
            </div>

            <div className="lg:col-span-5 h-[500px] lg:h-[700px] sticky top-24">
              <BriefingCard node={selectedNode} sectors={activeSectors} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex w-full">
            <AdjustmentView 
              initialData={activeData} 
              initialTimeframes={activeTimeframes}
              sectors={activeSectors}
              onConfirm={(newData, newTimeframes) => {
                if (activeVersion === 'v1') {
                  setV1Data(newData);
                  setV1Timeframes(newTimeframes);
                } else {
                  setV2Data(newData);
                  setV2Timeframes(newTimeframes);
                }
                setCurrentView('main');
              }}
              onCancel={() => setCurrentView('main')}
            />
          </div>
        )}

      </main>

      {/* Floating View Switcher at Bottom Right */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        {/* Version Switcher */}
        {currentView === 'main' && (
          <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-white/60">
            <button
              onClick={() => { setActiveVersion('v1'); setSelectedNode(null); }}
              className={clsx(
                "px-5 py-2 font-semibold text-sm rounded-lg transition-all",
                activeVersion === 'v1' ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              Version 1 (Original)
            </button>
            <button
              onClick={() => { setActiveVersion('v2'); setSelectedNode(null); }}
              className={clsx(
                "px-5 py-2 font-semibold text-sm rounded-lg transition-all",
                activeVersion === 'v2' ? "bg-rose-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              Version 2 (VHTS)
            </button>
          </div>
        )}

        <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-2xl border border-white/60">
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
            onClick={handleAdjustClick}
            className={clsx(
              "px-6 py-3 font-semibold text-sm rounded-lg transition-all",
              currentView === 'adjust' ? "bg-purple-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Mockup Adjustments
          </button>
          {currentView === 'main' && (
            <button
              onClick={handleExportClick}
              title="Export Data for Universal Update"
              className="px-4 py-3 font-semibold text-sm rounded-lg transition-all text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 border-l border-slate-200 ml-1 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          )}
        </div>
      </div>

      {/* Floating Clear Selection at Bottom Left */}
      {currentView === 'main' && (
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
      )}

      {/* Entry Password Prompt Modal */}
      {showEntryPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Restricted Access</h3>
            <p className="text-sm text-slate-600 mb-6">Enter password to access the Mockup Adjustments mode.</p>
            
            <input 
              type="password" 
              autoFocus
              value={entryPassword}
              onChange={e => {
                setEntryPassword(e.target.value);
                setEntryError(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') submitEntryPassword();
                if (e.key === 'Escape') setShowEntryPrompt(false);
              }}
              placeholder="Enter password..."
              className={clsx(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                entryError ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-purple-500"
              )}
            />
            {entryError && (
              <p className="text-red-500 text-sm mt-2 font-medium">Incorrect password. Please try again.</p>
            )}
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowEntryPrompt(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={submitEntryPassword}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Password Prompt Modal */}
      {showExportPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Export Data</h3>
            <p className="text-sm text-slate-600 mb-6">Enter password to download the updated data.</p>
            
            <input 
              type="password" 
              autoFocus
              value={exportPassword}
              onChange={e => {
                setExportPassword(e.target.value);
                setExportError(false);
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') submitExportPassword();
                if (e.key === 'Escape') setShowExportPrompt(false);
              }}
              placeholder="Enter password..."
              className={clsx(
                "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
                exportError ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-emerald-500"
              )}
            />
            {exportError && (
              <p className="text-red-500 text-sm mt-2 font-medium">Incorrect password. Please try again.</p>
            )}
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setShowExportPrompt(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={submitExportPassword}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
