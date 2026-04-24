import React, { useState } from 'react';
import { Play, X, Loader2, Download, RotateCcw, CheckCircle2, XCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { simulateWorkflow } from '../../api/mockApi';
import { useValidation } from '../../hooks/useValidation';

interface SimStep {
  nodeType: string;
  title: string;
  status: 'completed' | 'pending' | 'failed';
  detail: string;
}

function parseLogToSteps(log: string[], nodes: any[]): SimStep[] {
  const steps: SimStep[] = [];
  for (const entry of log) {
    const nodeMatch = nodes.find((n: any) => entry.includes(n.data.title));
    if (nodeMatch) {
      let status: SimStep['status'] = 'completed';
      if (entry.includes('[Warning]') || entry.includes('Pending') || entry.includes('Awaiting')) status = 'pending';
      if (entry.includes('[Error]') || entry.includes('Failed')) status = 'failed';
      steps.push({ nodeType: (nodeMatch.type || 'task').toUpperCase(), title: nodeMatch.data.title, status, detail: entry });
    } else if (entry.includes('[System]') || entry.includes('[Error]') || entry.includes('[Warning]')) {
      steps.push({ nodeType: 'SYSTEM', title: 'System', status: entry.includes('[Error]') ? 'failed' : 'completed', detail: entry });
    }
  }
  return steps;
}

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-500', label: 'Completed', labelColor: 'text-emerald-700' },
  pending: { icon: Clock, color: 'text-amber-500', label: 'Pending', labelColor: 'text-amber-700' },
  failed: { icon: XCircle, color: 'text-rose-500', label: 'Failed', labelColor: 'text-rose-700' },
};

const typeColors: Record<string, string> = {
  START: 'bg-emerald-500', TASK: 'bg-blue-500', APPROVAL: 'bg-amber-500',
  AUTOMATED: 'bg-violet-500', END: 'bg-rose-500', SYSTEM: 'bg-slate-500',
};

export const SandboxPanel: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const sandboxOpen = useStore((s) => s.sandboxOpen);
  const setSandboxOpen = useStore((s) => s.setSandboxOpen);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const edges = activeTab.edges;

  const { errors } = useValidation();
  const warnings = errors.filter((e) => e.severity === 'warning');
  const criticalErrors = errors.filter((e) => e.severity === 'error');

  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{ success: boolean; log: string[] } | null>(null);

  const handleSimulate = async () => {
    setIsLoading(true);
    setSimulationResult(null);
    try {
      const result = await simulateWorkflow({ nodes, edges });
      setSimulationResult(result);
    } catch {
      setSimulationResult({ success: false, log: ['[Error] Connection to simulation engine failed.'] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => setSimulationResult(null);

  const handleDownloadLog = () => {
    if (!simulationResult) return;
    const a = document.createElement('a');
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(simulationResult.log.join('\n'));
    a.download = "tredence-simulation-log.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleClickError = (nodeId: string) => {
    if (!nodeId) return;
    // Close sandbox & select the node so properties panel shows it
    setSandboxOpen(false);
    setSelectedNode(nodeId);
  };

  const steps = simulationResult ? parseLogToSteps(simulationResult.log, nodes) : [];

  if (!sandboxOpen) return null;

  return (
    <aside className="w-full md:w-[340px] h-[60%] md:h-full glass-panel absolute bottom-0 md:relative flex flex-col z-20 md:z-10 shrink-0 animate-slide-in-right border-t md:border-t-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none bg-white/95 md:bg-white/70">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-lg flex items-center justify-center text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="4,17 10,11 4,5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Sandbox</h2>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">Simulation</span>
          </div>
        </div>
        <button onClick={() => setSandboxOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
          <X size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Critical Errors */}
        {criticalErrors.length > 0 && (
          <div className="mb-3 p-3 bg-rose-50/80 border border-rose-200/60 rounded-xl animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <XCircle size={13} className="text-rose-600" />
              <span className="text-[11px] font-bold text-rose-700">Errors</span>
            </div>
            {criticalErrors.map((err, i) => (
              <button
                key={i}
                onClick={() => handleClickError(err.nodeId)}
                className="flex items-center gap-2 w-full text-left px-2 py-1.5 -mx-1 rounded-lg hover:bg-rose-100/60 transition-colors group"
              >
                <ArrowRight size={10} className="text-rose-400 group-hover:text-rose-600 transition-colors shrink-0" />
                <span className="text-[11px] text-rose-700">
                  <strong>"{err.nodeTitle}"</strong> — {err.message}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mb-3 p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle size={13} className="text-amber-600" />
              <span className="text-[11px] font-bold text-amber-700">Warnings</span>
            </div>
            {warnings.map((w, i) => (
              <button
                key={i}
                onClick={() => handleClickError(w.nodeId)}
                disabled={!w.nodeId}
                className={`flex items-center gap-2 w-full text-left px-2 py-1.5 -mx-1 rounded-lg transition-colors group ${
                  w.nodeId ? 'hover:bg-amber-100/60 cursor-pointer' : 'cursor-default'
                }`}
              >
                {w.nodeId ? (
                  <ArrowRight size={10} className="text-amber-400 group-hover:text-amber-600 transition-colors shrink-0" />
                ) : (
                  <span className="w-2.5 shrink-0" />
                )}
                <span className="text-[11px] text-amber-700">
                  <strong>"{w.nodeTitle}"</strong> — {w.message}
                </span>
              </button>
            ))}
          </div>
        )}

        {!simulationResult && !isLoading ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-16 h-16 bg-orange-100/80 text-[#f06422] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Play size={32} fill="currentColor" className="ml-1" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Ready to simulate</h3>
            <p className="text-[12px] text-slate-400 mt-2 max-w-[240px] mx-auto leading-relaxed">
              Run your workflow through the Tredence execution engine to validate logic.
            </p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-10 flex flex-col items-center animate-fade-in">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
              <Loader2 size={32} className="animate-spin text-[#f06422]" />
            </div>
            <p className="text-sm font-bold text-slate-700">Executing...</p>
            <p className="text-[11px] text-slate-400 mt-1">Tredence Engine</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {simulationResult?.success ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <XCircle size={18} className="text-rose-500" />
                )}
                <span className="text-sm font-bold text-slate-800">
                  {simulationResult?.success ? 'Simulation Complete' : 'Simulation Failed'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                {steps.length} steps
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {steps.map((step, idx) => {
                const cfg = statusConfig[step.status];
                const StatusIcon = cfg.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 animate-step-in" style={{ animationDelay: `${idx * 80}ms` }}>
                    <div className={`mt-0.5 ${cfg.color}`}>
                      <StatusIcon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white ${typeColors[step.nodeType] || 'bg-slate-500'}`}>
                          {step.nodeType}
                        </span>
                        <span className={`text-[10px] font-bold ${cfg.labelColor}`}>{cfg.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200/40 flex items-center gap-2 shrink-0">
        {simulationResult && (
          <>
            <button onClick={handleDownloadLog} className="flex items-center gap-1.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg transition-colors font-semibold">
              <Download size={12} /> Log
            </button>
            <button onClick={handleReset} className="flex items-center gap-1.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg transition-colors font-semibold">
              <RotateCcw size={12} /> Reset
            </button>
          </>
        )}
        <button
          onClick={handleSimulate}
          disabled={isLoading}
          className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-r from-[#f06422] to-[#e8530e] text-white rounded-xl transition-all disabled:opacity-50 shadow-md shadow-orange-200/40"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
          Run
        </button>
      </div>
    </aside>
  );
};
