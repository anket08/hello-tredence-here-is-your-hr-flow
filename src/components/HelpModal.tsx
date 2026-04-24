import React from 'react';
import { HelpCircle, X, CheckCircle, Copy, ClipboardPaste, Copy as Duplicate, Undo, Redo, Trash2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { label: 'Copy Node', keys: ['Ctrl', 'C'], icon: <Copy size={14} className="text-slate-400" /> },
    { label: 'Paste Node', keys: ['Ctrl', 'V'], icon: <ClipboardPaste size={14} className="text-slate-400" /> },
    { label: 'Duplicate', keys: ['Ctrl', 'D'], icon: <Duplicate size={14} className="text-slate-400" /> },
    { label: 'Undo Action', keys: ['Ctrl', 'Z'], icon: <Undo size={14} className="text-slate-400" /> },
    { label: 'Redo Action', keys: ['Ctrl', 'Y'], icon: <Redo size={14} className="text-slate-400" /> },
    { label: 'Delete Node', keys: ['Del'], icon: <Trash2 size={14} className="text-slate-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <HelpCircle size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Help & Shortcuts</h2>
              <p className="text-[11px] font-medium text-slate-500">Master the workflow builder</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-200 text-slate-400 transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Keyboard Shortcuts</h3>
          
          <div className="flex flex-col gap-2.5">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  {s.icon}
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{s.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {s.keys.map(k => (
                    <kbd key={k} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-bold text-slate-600 shadow-sm font-mono">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10 text-indigo-600">
              <CheckCircle size={48} />
            </div>
            <h4 className="text-[11px] font-bold text-indigo-800 uppercase tracking-widest mb-2 flex items-center gap-2 relative z-10">
              Pro Tip
            </h4>
            <p className="text-sm text-indigo-900/80 font-medium leading-relaxed relative z-10">
              Use the <strong className="text-indigo-700">Test Workflow</strong> button to immediately validate your logic. Nodes auto-snap to the canvas grid for perfect alignment!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Got it!
          </button>
        </div>

      </div>
    </div>
  );
};
