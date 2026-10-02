import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { FileItem, SortRule } from './types';
import { DEFAULT_RULES } from './data/defaultRules';
import { INITIAL_SAMPLE_FILES } from './data/sampleFiles';
import { Navbar } from './components/Navbar';
import { FileDropzone } from './components/FileDropzone';
import { FileGrid } from './components/FileGrid';
import { RulesEditor } from './components/RulesEditor';
import { ScriptGenerator } from './components/ScriptGenerator';

export function App() {
  const [rules, setRules] = useState<SortRule[]>(() => {
    const saved = localStorage.getItem('sortflow_rules');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_RULES; }
    }
    return DEFAULT_RULES;
  });

  const [files, setFiles] = useState<FileItem[]>(() => {
    const saved = localStorage.getItem('sortflow_files');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_SAMPLE_FILES; }
    }
    return INITIAL_SAMPLE_FILES;
  });

  const [activeTab, setActiveTab] = useState<'organizer' | 'rules' | 'scripts'>('organizer');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    localStorage.setItem('sortflow_rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    // Strip binary blob before saving to localStorage
    const storable = files.map(({ fileBlob: _, ...rest }) => rest);
    localStorage.setItem('sortflow_files', JSON.stringify(storable));
  }, [files]);

  const handleFilesAdded = (newFiles: FileItem[]) => {
    setFiles(prev => [...newFiles, ...prev]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleAddSampleFiles = () => {
    setFiles(INITIAL_SAMPLE_FILES);
  };

  const handleAddRule = (newRule: SortRule) => {
    setRules(prev => [...prev, newRule]);
    // Re-evaluate current files
    setFiles(prev => prev.map(f => {
      const ext = f.extension.toLowerCase();
      if (newRule.extensions.includes(ext)) {
        return { ...f, targetFolder: newRule.folderName, category: newRule.folderName };
      }
      return f;
    }));
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const handleExportZip = async () => {
    if (files.length === 0 || isExporting) return;
    setIsExporting(true);

    try {
      const zip = new JSZip();

      for (const f of files) {
        const folder = zip.folder(f.targetFolder);
        if (folder) {
          if (f.fileBlob) {
            folder.file(f.name, f.fileBlob);
          } else {
            // Generate dummy text content for sample simulated files
            const sampleContent = `Sample generated file: ${f.name}\nOrganized by SortFlow\nTarget Folder: ${f.targetFolder}\nSize: ${f.sizeBytes} bytes\nDate: ${f.modifiedDate}\n`;
            folder.file(f.name, sampleContent);
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const dl = document.createElement('a');
      dl.href = URL.createObjectURL(zipBlob);
      dl.download = `organized_workspace_${Date.now()}.zip`;
      document.body.appendChild(dl);
      dl.click();
      dl.remove();
    } catch (err) {
      console.error('ZIP generation failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const totalBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-100 selection:text-zinc-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fileCount={files.length}
        totalSizeMb={totalMb}
        onExportZip={handleExportZip}
        onAddSampleFiles={handleAddSampleFiles}
        isExporting={isExporting}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'organizer' && (
          <div className="space-y-6">
            <FileDropzone onFilesAdded={handleFilesAdded} rules={rules} />
            <FileGrid
              files={files}
              onRemoveFile={handleRemoveFile}
              onClearAll={handleClearAll}
            />
          </div>
        )}

        {activeTab === 'rules' && (
          <RulesEditor
            rules={rules}
            onAddRule={handleAddRule}
            onDeleteRule={handleDeleteRule}
          />
        )}

        {activeTab === 'scripts' && <ScriptGenerator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-4 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>SortFlow • Automated File Organization & Directory Sorter</span>
          <span>Crafted by <a href="https://github.com/davinascimento2" target="_blank" rel="noreferrer" className="text-zinc-300 hover:underline">Davi Nascimento</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
