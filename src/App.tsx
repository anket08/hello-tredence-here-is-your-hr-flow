import { useRef } from 'react';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertiesPanel } from './components/Properties/PropertiesPanel';
import { SandboxPanel } from './components/Sandbox/SandboxPanel';
import { TabBar } from './components/Tabs/TabBar';
import { useStore } from './store/useStore';
import { Wand2, Download, Upload, Undo2, Redo2, LayoutGrid } from 'lucide-react';

function App() {
  const loadSampleWorkflow = useStore((s) => s.loadSampleWorkflow);
  const autoLayout = useStore((s) => s.autoLayout);
  const importWorkflow = useStore((s) => s.importWorkflow);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const history = useStore((s) => s.history);
  const historyIndex = useStore((s) => s.historyIndex);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  const handleDownload = () => {
    const payload = { name: activeTab.name, nodes: activeTab.nodes, edges: activeTab.edges };
    const a = document.createElement('a');
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    a.download = `${activeTab.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) importWorkflow(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans" onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Hidden file input for import */}
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

      {/* ── Header ── */}
      <header className="h-12 bg-[#1a1410] flex items-center justify-between px-5 z-30 shrink-0 border-b border-[#2a2218]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/20">
            T
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-[14px] leading-tight tracking-tight text-white/90">Tredence Studio</h1>
            <span className="text-[9px] font-medium text-white/35 leading-tight tracking-widest uppercase">Workflow Designer</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1">
          {/* Undo / Redo */}
          <div className="flex items-center bg-white/5 rounded-lg p-0.5 mr-1 border border-white/5">
            <button onClick={undo} disabled={!canUndo} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors" title="Undo (Ctrl+Z)">
              <Undo2 size={14} />
            </button>
            <button onClick={redo} disabled={!canRedo} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors" title="Redo (Ctrl+Y)">
              <Redo2 size={14} />
            </button>
          </div>

          {/* Auto Layout */}
          <button onClick={autoLayout} className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white/90 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors border border-white/8" title="Auto-arrange nodes">
            <LayoutGrid size={14} />
            Auto-layout
          </button>

          {/* Load Sample */}
          <button onClick={loadSampleWorkflow} className="flex items-center gap-1.5 bg-[#f06422]/15 hover:bg-[#f06422]/25 text-[#f06422] px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors border border-[#f06422]/20">
            <Wand2 size={14} />
            Sample
          </button>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 mx-1"></div>

          {/* Import */}
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white/90 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors border border-white/8">
            <Upload size={14} />
            Import
          </button>

          {/* Export */}
          <button onClick={handleDownload} className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 text-white/60 hover:text-white/90 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors border border-white/8">
            <Download size={14} />
            Export
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
