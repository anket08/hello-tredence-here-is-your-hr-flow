import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { fetchAutomations } from '../../api/mockApi';
import type { AutomatedAction } from '../../api/mockApi';
import { Trash2 } from 'lucide-react';

const inputClass = "w-full border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f06422] focus:ring-2 focus:ring-[#f06422]/20 transition-all text-white/90 placeholder-white/30";
const labelClass = "text-[10px] font-bold text-white/40 uppercase tracking-widest";

export const PropertiesPanel: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const selectedNodeId = useStore((s) => s.selectedNodeId);
  const updateNodeData = useStore((s) => s.updateNodeData);
  const deleteSelectedElements = useStore((s) => s.deleteSelectedElements);
  const [actions, setActions] = useState<AutomatedAction[]>([]);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  useEffect(() => {
    if (selectedNode?.type === 'automated' && actions.length === 0) {
      fetchAutomations().then(setActions);
    }
  }, [selectedNode?.type]);

  if (!selectedNode) {
    return (
      <aside className="w-72 glass-panel flex flex-col justify-center items-center text-white/40 h-full z-10">
        <div className="text-center px-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🖱️</span>
          </div>
          <p className="text-sm font-medium text-white/60">No node selected</p>
          <p className="text-[11px] text-white/40 mt-1">Click a node on the canvas to edit</p>
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

  const colorMap: Record<string, string> = {
    start: '#10b981',
    task: '#3b82f6',
    approval: '#f59e0b',
    automated: '#8b5cf6',
    end: '#ef4444',
  };
  const nodeColor = colorMap[type] || '#64748b';

  return (
    <aside className="w-72 glass-panel h-full flex flex-col z-10 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#1a1410]/80 backdrop-blur-lg z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full" style={{ background: nodeColor }}></div>
          <div>
            <h2 className="text-sm font-bold text-white/90 capitalize">{type} Node</h2>
            <p className="text-[9px] font-mono text-white/40">{selectedNode.id.slice(0, 8)}</p>
          </div>
        </div>
        <button
          onClick={deleteSelectedElements}
          className="p-2 text-white/40 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
          title="Delete Node"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Fields */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Title *</label>
          <input type="text" name="title" value={data.title as string || ''} onChange={handleChange} className={inputClass} required />
        </div>

        {type === 'start' && (
          <p className="text-[11px] text-white/40 italic border-t border-dashed border-white/10 pt-3">Start node needs no extra config.</p>
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
                <option value="Manager" className="bg-[#1a1410]">Manager</option>
                <option value="HRBP" className="bg-[#1a1410]">HRBP</option>
                <option value="Director" className="bg-[#1a1410]">Director</option>
                <option value="VP" className="bg-[#1a1410]">VP</option>
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
                <option value="" className="bg-[#1a1410]">— Pick an action —</option>
                {actions.map(a => <option key={a.id} value={a.id} className="bg-[#1a1410]">{a.label}</option>)}
              </select>
            </div>
            {data.actionId && (
              <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 rounded-lg text-[11px] text-violet-400 font-medium">
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
            <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
              <input type="checkbox" name="isSummary" checked={data.isSummary as boolean || false} onChange={handleChange} className="w-4 h-4 rounded text-[#f06422] focus:ring-[#f06422]/30 accent-[#f06422] bg-[#1a1410] border-white/20" />
              <span className="text-[12px] font-medium text-white/80">Generate Summary Report</span>
            </label>
          </>
        )}
      </div>
    </aside>
  );
};
