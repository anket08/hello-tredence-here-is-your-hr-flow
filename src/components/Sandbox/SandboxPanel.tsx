import React, { useState } from 'react';
import { Play, X, Loader2, Download, Terminal, RotateCcw, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
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
    // Try to match node references
    const nodeMatch = nodes.find((n: any) => entry.includes(n.data.title));
    if (nodeMatch) {
      let status: SimStep['status'] = 'completed';
      if (entry.includes('[Warning]') || entry.includes('Pending') || entry.includes('Awaiting')) status = 'pending';
      if (entry.includes('[Error]') || entry.includes('Failed')) status = 'failed';
      steps.push({
        nodeType: (nodeMatch.type || 'task').toUpperCase(),
        title: nodeMatch.data.title,
        status,
        detail: entry,
      });
    } else if (entry.includes('[System]') || entry.includes('[Error]') || entry.includes('[Warning]')) {
      steps.push({
        nodeType: 'SYSTEM',
        title: 'System',
        status: entry.includes('[Error]') ? 'failed' : 'completed',
        detail: entry,
      });
    }
  }
  return steps;
}

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Completed', labelColor: 'text-emerald-700' },
  pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending', labelColor: 'text-amber-700' },
  failed: { icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Failed', labelColor: 'text-rose-700' },
};

const typeColors: Record<string, string> = {
  START: 'bg-emerald-500',
  TASK: 'bg-blue-500',
  APPROVAL: 'bg-amber-500',
  AUTOMATED: 'bg-violet-500',
  END: 'bg-rose-500',
  SYSTEM: 'bg-slate-500',
};

export const SandboxPanel: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const edges = activeTab.edges;

  const { errors } = useValidation();
  const warnings = errors.filter((e) => e.severity === 'warning');

  const [isOpen, setIsOpen] = useState(false);
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

  const handleReset = () => {
    setSimulationResult(null);
  };

  const handleDownloadLog = () => {
    if (!simulationResult) return;
    const logText = simulationResult.log.join('\n');
    const a = document.createElement('a');
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(logText);
    a.download = "tredence-simulation-log.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const steps = simulationResult ? parseLogToSteps(simulationResult.log, nodes) : [];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-5 right-5 bg-gradient-to-r from-[#f06422] to-[#e8530e] hover:from-[#e8530e] hover:to-[#d4561d] text-white rounded-2xl px-5 py-2.5 shadow-lg shadow-orange-200/50 flex items-center gap-2 font-semibold text-sm transition-colors z-20"
      >
        <Play size={16} fill="currentColor" />
        Test Workflow
      </button>

      {/* Sidebar Panel (not modal — slides in from right like reference) */}
      {isOpen && (
        <div className="absolute top-0 right-0 h-full w-[380px] glass-panel shadow-2xl z-30 flex flex-col border-l border-slate-200/40" style={{ backdropFilter: 'blur(24px)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <Terminal size={16} className="text-[#f06422]" />
              <h2 className="text-sm font-bold text-slate-800">Workflow Sandbox</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="mb-4 p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={13} className="text-amber-600" />
                  <span className="text-xs font-bold text-amber-700">Warnings</span>
                </div>
                {warnings.map((w, i) => (
                  <p key={i} className="text-[11px] text-amber-700 ml-5">• {w.message}{w.nodeId ? ` (${w.nodeId.slice(0, 8)})` : ''}</p>
                ))}
              </div>
            )}

            {!simulationResult && !isLoading ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-orange-100/80 text-[#f06422] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Play size={28} fill="currentColor" className="ml-0.5" />
                </div>
                <h3 className="text-base font-bold text-slate-700">Ready to simulate</h3>
                <p className="text-[12px] text-slate-400 mt-1.5 max-w-[260px] mx-auto leading-relaxed">
                  Run your workflow through the Tredence execution engine to validate structure and test logic.
                </p>
              </div>
            ) : isLoading ? (
              <div className="text-center py-10 flex flex-col items-center">
                <Loader2 size={36} className="animate-spin text-[#f06422] mb-4" />
                <p className="text-sm font-semibold text-slate-600">Simulating...</p>
                <p className="text-[11px] text-slate-400 mt-1">Tredence AI Engine</p>
              </div>
            ) : (
              <>
                {/* Simulation Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {simulationResult?.success ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <XCircle size={16} className="text-rose-500" />
                    )}
                    <span className="text-sm font-bold text-slate-800">
                      Simulation {simulationResult?.success ? 'Complete' : 'Failed'}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {steps.length} steps
                  </span>
                </div>

                {/* Step-by-step results */}
                <div className="flex flex-col gap-3">
                  {steps.map((step, idx) => {
                    const cfg = statusConfig[step.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 ${cfg.color}`}>
                          <StatusIcon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white ${typeColors[step.nodeType] || 'bg-slate-500'}`}>
                              {step.nodeType}
                            </span>
                            <span className={`text-[10px] font-bold ${cfg.labelColor}`}>{cfg.label}</span>
                          </div>
                          <p className="text-[12px] text-slate-700 mt-0.5 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-200/40 flex items-center gap-2 shrink-0">
            {simulationResult && (
              <>
                <button onClick={handleDownloadLog} className="flex items-center gap-1.5 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors font-medium">
                  <Download size={13} />
                  Export Log
                </button>
                <button onClick={handleReset} className="flex items-center gap-1.5 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors font-medium">
                  <RotateCcw size={13} />
                  Reset
                </button>
              </>
            )}
            <button
              onClick={handleSimulate}
              disabled={isLoading}
              className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#f06422] to-[#e8530e] text-white rounded-lg transition-all disabled:opacity-50 shadow-sm"
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              Run Simulation
            </button>
          </div>
        </div>
      )}
    </>
  );
};
