import React, { useState } from 'react';
import { SortRule } from '../types';
import { Plus, Trash2, Settings2 } from 'lucide-react';

interface RulesEditorProps {
  rules: SortRule[];
  onAddRule: (rule: SortRule) => void;
  onDeleteRule: (id: string) => void;
}

export const RulesEditor: React.FC<RulesEditorProps> = ({ rules, onAddRule, onDeleteRule }) => {
  const [folderName, setFolderName] = useState('');
  const [extensionsInput, setExtensionsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim() || !extensionsInput.trim()) return;

    const parsedExts = extensionsInput
      .split(',')
      .map(x => x.trim())
      .map(x => x.startsWith('.') ? x : `.${x}`)
      .filter(Boolean);

    onAddRule({
      id: `rule-${Date.now()}`,
      folderName: folderName.trim(),
      extensions: parsedExts
    });

    setFolderName('');
    setExtensionsInput('');
  };

  return (
    <div className="space-y-6">
      {/* Create Rule */}
      <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950">
        <h3 className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Settings2 className="w-3.5 h-3.5 text-zinc-400" />
          <span>Add Custom Sorting Rule</span>
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">DESTINATION FOLDER *</label>
            <input
              type="text"
              required
              value={folderName}
              onChange={e => setFolderName(e.target.value)}
              placeholder="e.g. DesignAssets"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">EXTENSIONS (COMMA SEPARATED) *</label>
            <input
              type="text"
              required
              value={extensionsInput}
              onChange={e => setExtensionsInput(e.target.value)}
              placeholder="e.g. .psd, .ai, .fig"
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 font-mono text-zinc-100 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-medium flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Rule</span>
            </button>
          </div>
        </form>
      </div>

      {/* Rules Table */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/60 border-b border-zinc-800 font-mono text-[11px] text-zinc-400">
            <tr>
              <th className="py-2.5 px-3">TARGET DIRECTORY</th>
              <th className="py-2.5 px-3">MATCHED EXTENSIONS</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-zinc-900/30">
                <td className="py-2.5 px-3 font-mono font-semibold text-zinc-200">
                  {rule.folderName}/
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex flex-wrap gap-1">
                    {rule.extensions.map(ext => (
                      <span
                        key={ext}
                        className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                      >
                        {ext}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => onDeleteRule(rule.id)}
                    className="p-1 text-zinc-500 hover:text-rose-400"
                    title="Delete Rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
