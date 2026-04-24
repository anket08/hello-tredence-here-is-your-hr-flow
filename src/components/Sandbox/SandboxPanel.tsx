import React, { useState } from 'react';
import { Play, X, Loader2, Download, Terminal } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { simulateWorkflow } from '../../api/mockApi';

export const SandboxPanel: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const edges = activeTab.edges;
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
      setSimulationResult({ success: false, log: ['Error connecting to simulation service.'] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadLog = () => {
    if (!simulationResult) return;
    const logText = simulationResult.log.join('\n');
    const a = document.createElement('a');
    a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(logText));
    a.setAttribute("download", "tredence-simulation-log.txt");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      {/* Floating Test Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-5 right-5 bg-gradient-to-r from-[#f06422] to-[#e8530e] hover:from-[#e8530e] hover:to-[#d4561d] text-white rounded-2xl px-5 py-2.5 shadow-lg shadow-orange-500/20 flex items-center gap-2 font-semibold text-sm transition-colors z-20"
      >
        <Play size={16} fill="currentColor" />
        Test Workflow
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1410] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#221a15]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-xl flex items-center justify-center text-white shadow-sm">
                  <Terminal size={15} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white/90">Workflow Sandbox</h2>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Tredence Simulation Engine</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto">
              {!simulationResult && !isLoading ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-orange-500/10 text-[#f06422] border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Play size={28} fill="currentColor" className="ml-0.5" />
                  </div>
                  <h3 className="text-base font-bold text-white/90">Ready to simulate</h3>
                  <p className="text-sm text-white/50 mt-1.5 max-w-xs mx-auto">
                    Run your workflow through the Tredence execution engine to validate structure and logic.
                  </p>
                </div>
              ) : isLoading ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <Loader2 size={36} className="animate-spin text-[#f06422] mb-4" />
                  <p className="text-sm font-semibold text-white/60">Tredence AI Engine Simulating...</p>
                </div>
              ) : (
                <div className="bg-[#0c0907] rounded-2xl p-5 font-mono text-sm shadow-inner border border-white/5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${simulationResult?.success ? 'bg-emerald-500' : 'bg-rose-500'} animate-soft-pulse`}></div>
                      <span className="text-white/80 font-bold text-xs tracking-wide uppercase">
                        {simulationResult?.success ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <button
                      onClick={handleDownloadLog}
                      className="flex items-center gap-1.5 text-[11px] bg-white/5 hover:bg-white/10 text-white/70 px-2.5 py-1.5 rounded-lg transition-colors border border-white/10"
                    >
                      <Download size={12} />
                      Export
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-[36vh] overflow-y-auto pr-2 dark-scrollbar">
                    {simulationResult?.log.map((entry, idx) => {
                      let c = "text-white/50";
                      if (entry.includes('[Error]') || entry.includes('[Warning]')) c = "text-rose-400";
                      if (entry.includes('[System]')) c = "text-cyan-400";
                      if (entry.includes('[Task]')) c = "text-blue-400";
                      if (entry.includes('[Approval]')) c = "text-amber-400";
                      return (
                        <div key={idx} className={`${c} flex gap-3 leading-relaxed`}>
                          <span className="text-white/30 select-none w-5 text-right shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                          <span>{entry}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-[#221a15] flex justify-end gap-2.5">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                Close
              </button>
              <button
                onClick={handleSimulate}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#f06422] to-[#e8530e] text-white rounded-lg transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm shadow-orange-500/20 hover:shadow-md"
              >
                {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
                Run Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
