import { Radar } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-white/30 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg">
              <Radar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                Future Technology Dashboard
              </h1>
              <p className="text-xs text-slate-400 font-medium">NBTC 2026 Technology Radar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-700 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
