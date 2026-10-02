import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export const ScriptGenerator: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pythonScript = `#!/usr/bin/env python3
"""
SortFlow - Automated File Organizer Script
Author: Davi Nascimento
"""

import os
import shutil
from pathlib import Path

EXT_MAP = {
    "Documents": [".pdf", ".docx", ".doc", ".txt", ".xlsx", ".pptx", ".csv", ".md"],
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    "Audio": [".mp3", ".wav", ".flac", ".ogg"],
    "Videos": [".mp4", ".mkv", ".mov"],
    "Archives": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "SourceCode": [".py", ".js", ".ts", ".html", ".css", ".json", ".sql", ".rs"]
}

def organize(directory="."):
    target_path = Path(directory)
    for item in target_path.iterdir():
        if item.is_dir() or item.name.startswith('.'):
            continue
        ext = item.suffix.lower()
        destination = "Others"
        for folder, exts in EXT_MAP.items():
            if ext in exts:
                destination = folder
                break
        dest_dir = target_path / destination
        dest_dir.mkdir(exist_ok=True)
        shutil.move(str(item), str(dest_dir / item.name))
        print(f"Moved: {item.name} -> {destination}/")

if __name__ == "__main__":
    organize()`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
        <div className="bg-zinc-900/60 px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>organizador.py (Python Automation CLI)</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>

        <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed bg-zinc-950">
          {pythonScript}
        </pre>
      </div>
    </div>
  );
};
