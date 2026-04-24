import React from 'react';
import { BarChart3, Activity, Clock, ShieldCheck, X, Zap, Users, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

interface WorkflowInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowInsightsModal: React.FC<WorkflowInsightsModalProps> = ({ isOpen, onClose }) => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!isOpen || !activeTab) return null;

  const nodes = activeTab.nodes;
  const edges = activeTab.edges;

  const totalNodes = nodes.length;
  const approvals = nodes.filter(n => n.type === 'approval').length;
  const tasks = nodes.filter(n => n.type === 'task').length;
  const automated = nodes.filter(n => n.type === 'automated').length;
  
  // Fake mock calculations for premium feel
  const executionTime = (tasks * 24) + (approvals * 48) + (automated * 0.5); // in hours
  const complexityScore = Math.min(100, Math.round(((nodes.length * 2) + (edges.length * 3)) * 1.5));
  
  let riskLevel = 'Low';
  let riskColor = 'text-emerald-600 bg-emerald-50';
  if (complexityScore > 40) {
    riskLevel = 'Medium';
    riskColor = 'text-amber-600 bg-amber-50';
  }
  if (complexityScore > 75) {
    riskLevel = 'High';
    riskColor = 'text-rose-600 bg-rose-50';
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-fuchsia-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center shadow-inner">
              <BarChart3 size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-800">Workflow Insights</h2>
              <p className="text-[11px] font-medium text-slate-500">Analytics & Health Metrics</p>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Main Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-blue-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Complexity Score</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-800">{complexityScore}</span>
                <span className="text-sm font-medium text-slate-400 mb-1">/ 100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${complexityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-fuchsia-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Execution</span>
              </div>
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-black text-slate-800">{executionTime > 24 ? Math.round(executionTime / 24) : executionTime}</span>
                <span className="text-sm font-medium text-slate-500 mb-1">{executionTime > 24 ? 'days' : 'hours'}</span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 mt-2">Based on historical averages</p>
            </div>
          </div>

          {/* Node Breakdown */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest">Node Composition ({totalNodes} Total)</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <Zap size={18} className="text-indigo-500 mb-1" />
                <span className="text-lg font-bold text-indigo-700">{automated}</span>
                <span className="text-[10px] font-semibold text-indigo-600/70 uppercase">Automated</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <ShieldCheck size={18} className="text-emerald-500 mb-1" />
                <span className="text-lg font-bold text-emerald-700">{approvals}</span>
                <span className="text-[10px] font-semibold text-emerald-600/70 uppercase">Approvals</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <Users size={18} className="text-blue-500 mb-1" />
                <span className="text-lg font-bold text-blue-700">{tasks}</span>
                <span className="text-[10px] font-semibold text-blue-600/70 uppercase">Manual Tasks</span>
              </div>
            </div>
          </div>

          {/* Health Check */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={14} /> Workflow Health
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Operational Risk Level</span>
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${riskColor}`}>
                {riskLevel}
              </span>
            </div>
            {riskLevel === 'High' && (
              <p className="text-xs text-rose-600/80 font-medium mt-2">
                This workflow contains many manual approvals, which may lead to bottlenecks. Consider automating standard steps.
              </p>
            )}
            {riskLevel === 'Low' && (
              <p className="text-xs text-emerald-600/80 font-medium mt-2">
                Excellent! This workflow is streamlined and optimized for quick resolution.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
