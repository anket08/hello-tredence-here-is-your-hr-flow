import React, { useState } from 'react';
import { LayoutTemplate, X } from 'lucide-react';
import { workflowTemplates } from '../../data/templates';
import { useStore } from '../../store/useStore';

export const TemplateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { importWorkflow, autoLayout } = useStore();

  if (!isOpen) return null;

  const handleSelect = (templateId: string) => {
    const template = workflowTemplates.find((t) => t.id === templateId);
    if (!template) return;
    importWorkflow(JSON.stringify({ nodes: template.nodes, edges: template.edges }));
    setTimeout(() => autoLayout(), 50);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="glass-strong rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-xl flex items-center justify-center text-white shadow-sm">
              <LayoutTemplate size={15} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Workflow Templates</h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Preset HR Flows</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Templates List */}
        <div className="p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {workflowTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left w-full ${
                hoveredId === template.id
                  ? 'bg-[#f06422]/5 border-[#f06422]/30 shadow-sm'
                  : 'bg-white/50 border-slate-200/50 hover:bg-white/80'
              }`}
            >
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {template.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-slate-800">{template.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{template.description}</div>
                <div className="text-[10px] text-slate-400 mt-1 font-medium">{template.nodes.length} nodes · {template.edges.length} edges</div>
              </div>
              <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                hoveredId === template.id
                  ? 'bg-[#f06422] text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                Use
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
