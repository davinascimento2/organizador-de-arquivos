import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { FileItem, SortRule } from '../types';

interface FileDropzoneProps {
  onFilesAdded: (newFiles: FileItem[]) => void;
  rules: SortRule[];
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAdded, rules }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getTargetFolder = (ext: string): { folder: string; category: string } => {
    const cleanExt = ext.toLowerCase();
    for (const rule of rules) {
      if (rule.extensions.includes(cleanExt)) {
        return { folder: rule.folderName, category: rule.folderName };
      }
    }
    return { folder: 'Others', category: 'Others' };
  };

  const handleFiles = (files: FileList) => {
    const items: FileItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const ext = '.' + f.name.split('.').pop()?.toLowerCase();
      const { folder, category } = getTargetFolder(ext);

      items.push({
        id: `f-${Date.now()}-${i}`,
        name: f.name,
        sizeBytes: f.size,
        extension: ext,
        modifiedDate: new Date(f.lastModified).toISOString().substring(0, 10),
        category,
        targetFolder: folder,
        fileBlob: f
      });
    }
    onFilesAdded(items);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className="border border-dashed border-zinc-800 hover:border-zinc-600 rounded-lg p-6 text-center cursor-pointer bg-zinc-950 transition-colors"
    >
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
      />
      <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center text-zinc-400 mb-2">
        <UploadCloud className="w-5 h-5" />
      </div>
      <p className="text-xs font-medium text-zinc-200">
        Click to browse or drop unorganized files directly here
      </p>
      <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">
        All client-side processing • Zero data upload to external servers
      </p>
    </div>
  );
};
