import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { fetchAutomations } from '../../api/mockApi';
import type { AutomatedAction } from '../../api/mockApi';
import { Trash2, History, Save, RotateCcw, Copy } from 'lucide-react';
import type { NodeHistoryEntry } from '../../types/workflow';

const inputClass = "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all duration-400 theme-input";
const labelClass = "text-[10px] font-bold uppercase tracking-widest transition-colors duration-400 theme-label";

export const PropertiesPanel: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const selectedNodeId = useStore((s) => s.selectedNodeId);
  const updateNodeData = useStore((s) => s.updateNodeData);
  const deleteSelectedElements = useStore((s) => s.deleteSelectedElements);
  const duplicateNode = useStore((s) => s.duplicateNode);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const [actions, setActions] = useState<AutomatedAction[]>([]);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  useEffect(() => {
    if (selectedNode?.type === 'automated' && actions.length === 0) {
      fetchAutomations().then(setActions);
    }
  }, [selectedNode?.type]);

  if (!selectedNode) {
    return (
      <aside className="hidden md:flex w-full md:w-72 h-[35%] md:h-full glass-panel flex-col justify-center items-center z-20 md:z-10 border-t md:border-t-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none transition-colors duration-400">
        <div className="text-center px-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 theme-input transition-colors duration-400">
            <span className="text-xl">🖱️</span>
          </div>
          <p className="text-sm font-medium transition-colors duration-400 theme-label">No node selected</p>
          <p className="text-[11px] mt-1 transition-colors duration-400 theme-label opacity-80">Click a node on the canvas to edit</p>
        </div>
      </aside>
    );
  }

  const { type, data } = selectedNode;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    const finalValue = inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    updateNodeData(selectedNode.id, { [name]: finalValue });
  };

  const handleSaveVersion = () => {
    if (!selectedNode) return;
    const { history, ...currentData } = selectedNode.data as any;
    const newEntry: NodeHistoryEntry = { timestamp: Date.now(), data: currentData };
    const newHistory = [newEntry, ...(history || [])].slice(0, 10);
    updateNodeData(selectedNode.id, { history: newHistory });
  };

  const handleRestoreVersion = (entry: NodeHistoryEntry) => {
    if (!selectedNode) return;
    const { history } = selectedNode.data as any;
    updateNodeData(selectedNode.id, { ...entry.data, history });
  };

  const colorMap: Record<string, string> = {
    start: '#10b981',
    task: '#3b82f6',
    approval: '#f59e0b',
    automated: '#8b5cf6',
    end: '#ef4444',
  };
  const nodeColor = colorMap[type] || '#64748b';

  return (
    <aside className="fixed md:relative bottom-0 left-0 right-0 h-[65vh] md:h-full w-full md:w-72 glass-panel flex flex-col z-50 md:z-10 overflow-y-auto border-t md:border-t-0 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] md:shadow-none transition-colors duration-400 rounded-t-3xl md:rounded-none animate-slide-up md:animate-none">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between sticky top-0 backdrop-blur-lg z-10 transition-colors duration-400" style={{ background: 'var(--theme-panel-bg)', borderColor: 'var(--theme-panel-border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full shrink-0" style={{ background: nodeColor }}></div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold capitalize transition-colors duration-400 truncate" style={{ color: 'var(--theme-text)' }}>{type} Node</h2>
            <p className="text-[9px] font-mono transition-colors duration-400 theme-label">{selectedNode.id.slice(0, 8)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={duplicateNode}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Duplicate Node"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={deleteSelectedElements}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete Node"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setSelectedNode(null)}
            className="md:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg ml-1"
            title="Close Panel"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Title *</label>
          <input type="text" name="title" value={data.title as string || ''} onChange={handleChange} className={inputClass} required />
        </div>

        {type === 'start' && (
          <p className="text-[11px] italic border-t border-dashed pt-3 transition-colors duration-400 theme-label" style={{ borderColor: 'var(--theme-panel-border)' }}>Start node needs no extra config.</p>
        )}

        {type === 'task' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Description</label>
              <textarea name="description" value={data.description as string || ''} onChange={handleChange} rows={2} className={inputClass + " resize-none"} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Assignee</label>
              <input type="text" name="assignee" value={data.assignee as string || ''} onChange={handleChange} className={inputClass} placeholder="jane@tredence.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Due Date</label>
              <input type="date" name="dueDate" value={data.dueDate as string || ''} onChange={handleChange} className={inputClass} />
            </div>
          </>
        )}

        {type === 'approval' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Approver Role</label>
              <select name="approverRole" value={data.approverRole as string || 'Manager'} onChange={handleChange} className={inputClass}>
                <option value="Manager">Manager</option>
                <option value="HRBP">HRBP</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Auto-approve after (days)</label>
              <input type="number" name="autoApproveThreshold" value={data.autoApproveThreshold as number || ''} onChange={handleChange} className={inputClass} min="0" />
            </div>
          </>
        )}

        {type === 'automated' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Action</label>
              <select name="actionId" value={data.actionId as string || ''} onChange={handleChange} className={inputClass}>
                <option value="">— Pick an action —</option>
                {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
            {data.actionId && (
              <div className="p-2.5 border rounded-lg text-[11px] font-medium transition-colors duration-400" style={{ background: 'var(--theme-primary-light)', borderColor: 'var(--theme-primary)', color: 'var(--theme-text)' }}>
                Params: {actions.find(a => a.id === data.actionId)?.params.join(', ')}
              </div>
            )}
          </>
        )}

        {type === 'end' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>End Message</label>
              <input type="text" name="endMessage" value={data.endMessage as string || ''} onChange={handleChange} className={inputClass} placeholder="Done!" />
            </div>
            <label className="flex items-center gap-3 p-3 rounded-xl border transition-colors duration-400 cursor-pointer" style={{ borderColor: 'var(--theme-panel-border)', background: 'var(--theme-input-bg)' }}>
              <input type="checkbox" name="isSummary" checked={data.isSummary as boolean || false} onChange={handleChange} className="w-4 h-4 rounded text-[#f06422] focus:ring-[#f06422]/30 accent-[#f06422]" />
              <span className="text-[12px] font-medium transition-colors duration-400" style={{ color: 'var(--theme-text)' }}>Generate Summary Report</span>
            </label>
          </>
        )}

        {/* History Section */}
        <div className="mt-4 pt-4 border-t transition-colors duration-400" style={{ borderColor: 'var(--theme-panel-border)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold flex items-center gap-1.5 transition-colors duration-400" style={{ color: 'var(--theme-text)' }}>
              <History size={14} className="opacity-60" style={{ color: 'var(--theme-text)' }} />
              Node History
            </h3>
            <button
              onClick={handleSaveVersion}
              className="px-2 py-1 border shadow-sm text-[10px] font-bold rounded flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ background: 'var(--theme-input-bg)', borderColor: 'var(--theme-panel-border)', color: 'var(--theme-primary)' }}
            >
              <Save size={10} /> Save Version
            </button>
          </div>
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1">
            {!(data.history as NodeHistoryEntry[])?.length && (
              <p className="text-[10px] italic transition-colors duration-400 theme-label">No history saved yet.</p>
            )}
            {(data.history as NodeHistoryEntry[])?.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg border hover:brightness-110 transition-colors" style={{ background: 'var(--theme-input-bg)', borderColor: 'var(--theme-panel-border)' }}>
                <div>
                  <div className="text-[10px] font-medium transition-colors duration-400" style={{ color: 'var(--theme-text)' }}>{new Date(entry.timestamp).toLocaleString()}</div>
                  <div className="text-[9px] transition-colors duration-400 theme-label">{Object.keys(entry.data).length} fields</div>
                </div>
                <button
                  onClick={() => handleRestoreVersion(entry)}
                  className="p-1 hover:opacity-80 transition-colors"
                  style={{ color: 'var(--theme-primary)' }}
                  title="Restore this version"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
