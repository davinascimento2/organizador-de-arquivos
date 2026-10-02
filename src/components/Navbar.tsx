import React from 'react';
import { FolderTree, Settings2, Terminal, Download, Archive, Plus } from 'lucide-react';

interface NavbarProps {
  activeTab: 'organizer' | 'rules' | 'scripts';
  setActiveTab: (tab: 'organizer' | 'rules' | 'scripts') => void;
  fileCount: number;
  totalSizeMb: string;
  onExportZip: () => void;
  onAddSampleFiles: () => void;
  isExporting: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  fileCount,
  totalSizeMb,
  onExportZip,
  onAddSampleFiles,
  isExporting
}) => {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-xs">
            <Archive className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-xs text-zinc-100 tracking-tight">SortFlow</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            v2.0
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-zinc-800 text-[11px] font-mono text-zinc-400">
          <span>{fileCount} files cataloged</span>
          <span>•</span>
          <span>{totalSizeMb} MB total volume</span>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1 bg-zinc-900 p-1 rounded-md border border-zinc-800">
        <button
          onClick={() => setActiveTab('organizer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            activeTab === 'organizer' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Folder Workbench</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            activeTab === 'rules' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Rules Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('scripts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
            activeTab === 'scripts' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Automation CLI</span>
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAddSampleFiles}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Load Test Batch</span>
        </button>

        <button
          disabled={fileCount === 0 || isExporting}
          onClick={onExportZip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs font-mono transition-colors disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Packaging...' : 'Export Sorted ZIP'}</span>
        </button>
      </div>
    </header>
  );
};
