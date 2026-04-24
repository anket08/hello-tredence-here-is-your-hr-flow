import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertiesPanel } from './components/Properties/PropertiesPanel';
import { SandboxPanel } from './components/Sandbox/SandboxPanel';
import { TabBar } from './components/Tabs/TabBar';
import { useStore } from './store/useStore';
import { Wand2, Download } from 'lucide-react';

function App() {
  const loadSampleWorkflow = useStore((s) => s.loadSampleWorkflow);
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleDownloadWorkflow = () => {
    const payload = { name: activeTab.name, nodes: activeTab.nodes, edges: activeTab.edges };
    const a = document.createElement('a');
    a.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2)));
    a.setAttribute("download", `${activeTab.name.replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans">
      {/* ── Header ── */}
      <header className="h-14 glass-strong flex items-center justify-between px-5 z-30 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-orange-200/60">
            T
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[15px] leading-tight tracking-tight text-slate-800">Tredence Studio</h1>
            <span className="text-[10px] font-medium text-slate-400 leading-tight tracking-wide uppercase">HR Workflow Designer</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadSampleWorkflow}
            className="flex items-center gap-2 bg-[#f06422]/10 hover:bg-[#f06422]/20 text-[#d4561d] px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-[#f06422]/20 hover:border-[#f06422]/40"
          >
            <Wand2 size={15} />
            Load Sample
          </button>
          <button
            onClick={handleDownloadWorkflow}
            className="flex items-center gap-2 bg-white/60 hover:bg-white/90 text-slate-600 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-slate-200/60 hover:border-slate-300 shadow-sm"
          >
            <Download size={15} />
            Export JSON
          </button>
        </div>
      </header>

      {/* ── Tab Bar ── */}
      <TabBar />

      {/* ── Main Layout ── */}
      <main className="flex-1 flex overflow-hidden relative">
        <Sidebar />

        <div className="flex-1 relative">
          <WorkflowCanvas />
          <SandboxPanel />
        </div>

        <PropertiesPanel />
      </main>

      {/* ── Signature ── */}
      <div className="fixed bottom-3 left-3 z-50 pointer-events-none">
        <div className="glass rounded-full px-3.5 py-1 flex items-center gap-2 shadow-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-soft-pulse"></div>
          <span className="text-[11px] font-medium text-slate-500">
            Built for <span className="text-[#f06422] font-bold">Tredence</span> by <span className="text-slate-700 font-bold">Anket</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
