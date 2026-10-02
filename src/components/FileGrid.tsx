import React, { useState } from 'react';
import { FileItem } from '../types';
import { Folder, Trash2, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface FileGridProps {
  files: FileItem[];
  onRemoveFile: (id: string) => void;
  onClearAll: () => void;
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onRemoveFile, onClearAll }) => {
  const [activeFolderFilter, setActiveFolderFilter] = useState<string>('All');

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredFiles = activeFolderFilter === 'All'
    ? files
    : files.filter(f => f.targetFolder === activeFolderFilter);

  // Group by destination folder
  const groupedFolders: Record<string, FileItem[]> = {};
  files.forEach(f => {
    if (!groupedFolders[f.targetFolder]) groupedFolders[f.targetFolder] = [];
    groupedFolders[f.targetFolder].push(f);
  });

  return (
    <div className="space-y-6">
      {/* Folder Destination Bucket Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Target Destination Buckets ({Object.keys(groupedFolders).length})
          </span>
          {files.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] font-mono text-zinc-500 hover:text-rose-400"
            >
              Clear Workspace
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(groupedFolders).map(([folderName, folderFiles]) => {
            const isSelected = activeFolderFilter === folderName;
            return (
              <button
                key={folderName}
                onClick={() => setActiveFolderFilter(isSelected ? 'All' : folderName)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-500 text-zinc-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Folder className="w-4 h-4 text-zinc-400" />
                  <span className="font-semibold text-xs truncate">{folderName}/</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>{folderFiles.length} files</span>
                  <span>{formatSize(folderFiles.reduce((acc, f) => acc + f.sizeBytes, 0))}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Manifest Table */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
        <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Files Organization Manifest ({filteredFiles.length})</span>
          </div>
          {activeFolderFilter !== 'All' && (
            <button
              onClick={() => setActiveFolderFilter('All')}
              className="text-[11px] text-zinc-300 underline"
            >
              Show all ({files.length})
            </button>
          )}
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/30 border-b border-zinc-800 font-mono text-[11px] text-zinc-400">
            <tr>
              <th className="py-2.5 px-3">SOURCE FILENAME</th>
              <th className="py-2.5 px-3">EXTENSION</th>
              <th className="py-2.5 px-3">SIZE</th>
              <th className="py-2.5 px-3">DESTINATION PATH</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 font-mono">
            {filteredFiles.map((file) => (
              <tr key={file.id} className="hover:bg-zinc-900/30">
                <td className="py-2 px-3 font-sans text-zinc-200 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate max-w-sm">{file.name}</span>
                </td>
                <td className="py-2 px-3 text-zinc-400">{file.extension}</td>
                <td className="py-2 px-3 text-zinc-500 text-[11px]">{formatSize(file.sizeBytes)}</td>
                <td className="py-2 px-3 text-zinc-300 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                  <span className="font-semibold text-zinc-100">{file.targetFolder}/</span>
                  <span className="text-zinc-500 text-[11px]">{file.name}</span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400"
                    title="Remove from batch"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFiles.length === 0 && (
          <div className="py-12 text-center text-zinc-500 text-xs font-mono">
            No files currently in this workspace. Drag and drop files above to start.
          </div>
        )}
      </div>
    </div>
  );
};
