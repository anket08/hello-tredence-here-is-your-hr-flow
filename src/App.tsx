import { useRef, useState, useEffect } from 'react';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertiesPanel } from './components/Properties/PropertiesPanel';
import { SandboxPanel } from './components/Sandbox/SandboxPanel';
import { TabBar } from './components/Tabs/TabBar';
import { StatusBar } from './components/StatusBar/StatusBar';
import { TemplateModal } from './components/Templates/TemplateModal';
import { HelpModal } from './components/HelpModal';
import { WorkflowInsightsModal } from './components/WorkflowInsightsModal';
import { useStore } from './store/useStore';

function App() {
  const loadSampleWorkflow = useStore((s) => s.loadSampleWorkflow);
  const autoLayout = useStore((s) => s.autoLayout);
  const importWorkflow = useStore((s) => s.importWorkflow);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const past = useStore((s) => s.past);
  const future = useStore((s) => s.future);
  const sandboxOpen = useStore((s) => s.sandboxOpen);
  const setSandboxOpen = useStore((s) => s.setSandboxOpen);
  const downloadPngFn = useStore((s) => s.downloadPngFn);
  const clearCanvas = useStore((s) => s.clearCanvas);
  const duplicateNode = useStore((s) => s.duplicateNode);
  const copySelectedNode = useStore((s) => s.copySelectedNode);
  const pasteNode = useStore((s) => s.pasteNode);
  const showTemplates = useStore((s) => s.showTemplates);
  const setShowTemplates = useStore((s) => s.setShowTemplates);

  const [showHelp, setShowHelp] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const handleDownload = () => {
    const payload = { name: activeTab.name, nodes: activeTab.nodes, edges: activeTab.edges };
    const a = document.createElement('a');
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    a.download = `${activeTab.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadPng = () => {
    if (downloadPngFn) downloadPngFn();
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') { e.preventDefault(); duplicateNode(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') { e.preventDefault(); copySelectedNode(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') { e.preventDefault(); pasteNode(); }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans" onKeyDown={handleKeyDown} tabIndex={-1}>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      <TemplateModal isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <WorkflowInsightsModal isOpen={showInsights} onClose={() => setShowInsights(false)} />

      {/* ── Header ── */}
      <header className="min-h-[3rem] md:h-12 glass-strong flex flex-wrap md:flex-nowrap items-center justify-between px-2 md:px-4 py-2 md:py-0 z-30 shrink-0 shadow-sm gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#f06422] to-[#e8530e] rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-orange-200/60">
            T
          </div>
          <div className="h-6 w-px bg-slate-200/60"></div>
          <span className="text-sm font-bold text-slate-700 tracking-tight">HR4TREDENCE</span>
        </div>

        {/* Center Toolbar */}
        <div className="flex items-center gap-0.5 glass rounded-xl px-1.5 py-1 overflow-x-auto max-w-full md:max-w-none order-3 md:order-none w-full md:w-auto mt-1 md:mt-0 hide-scrollbar">
          {/* Undo */}
          <button onClick={undo} disabled={!canUndo} className="group p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all" title="Undo (Ctrl+Z)">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,14 4,9 9,4" />
              <path d="M20,20v-7a4,4,0,0,0-4-4H4" />
            </svg>
          </button>
          {/* Redo */}
          <button onClick={redo} disabled={!canRedo} className="group p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-all" title="Redo (Ctrl+Y)">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,14 20,9 15,4" />
              <path d="M4,20v-7a4,4,0,0,1,4-4h12" />
            </svg>
          </button>

          <div className="w-px h-5 bg-slate-300/40 mx-1"></div>

          {/* Arrange */}
          <button onClick={autoLayout} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-violet-700 hover:bg-violet-50/80 transition-all" title="Auto-arrange nodes">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            Arrange
          </button>

          <button onClick={loadSampleWorkflow} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-[#f06422] hover:bg-orange-50/80 transition-all" title="Load sample workflow">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
            </svg>
            Quick Build
          </button>

          {/* Clear */}
          <button onClick={clearCanvas} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/80 transition-all" title="Clear Canvas">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Clear
          </button>

          {/* Templates */}
          <button onClick={() => setShowTemplates(true)} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-blue-700 hover:bg-blue-50/80 transition-all" title="Preset templates">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="9" x2="9" y2="21" />
            </svg>
            Templates
          </button>

          {/* Insights */}
          <button onClick={() => setShowInsights(true)} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-fuchsia-700 hover:bg-fuchsia-50/80 transition-all" title="Workflow Insights & Analytics">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="14" width="4" height="7" rx="1" />
              <rect x="10" y="8" width="4" height="13" rx="1" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
            Insights
          </button>

          {/* Help Button */}
          <button onClick={() => setShowHelp(true)} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-purple-700 hover:bg-purple-50/80 transition-all" title="Keyboard Shortcuts & Help">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Help
          </button>

          <div className="w-px h-5 bg-slate-300/40 mx-1"></div>

          {/* Fullscreen Toggle */}
          <button onClick={toggleFullscreen} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-indigo-700 hover:bg-indigo-50/80 transition-all" title="Toggle Fullscreen">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <>
                  <polyline points="8 3 8 8 3 8" />
                  <polyline points="16 3 16 8 21 8" />
                  <polyline points="8 21 8 16 3 16" />
                  <polyline points="16 21 16 16 21 16" />
                </>
              ) : (
                <>
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </>
              )}
            </svg>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>

          <div className="w-px h-5 bg-slate-300/40 mx-1"></div>

          {/* Export JSON */}
          <button onClick={handleDownload} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all" title="Export JSON">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21,15v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export JSON
          </button>

          {/* Export PNG */}
          <button onClick={handleDownloadPng} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-cyan-700 hover:bg-cyan-50/80 transition-all" title="Download High-Res PNG">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            PNG
          </button>

          {/* Import */}
          <button onClick={() => fileInputRef.current?.click()} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-amber-700 hover:bg-amber-50/80 transition-all" title="Import JSON">
            <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21,15v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Import
          </button>
        </div>

        {/* Right side — Test Workflow button */}
        <button
          onClick={() => setSandboxOpen(!sandboxOpen)}
          className={`group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            sandboxOpen
              ? 'bg-[#f06422] text-white shadow-md shadow-orange-200/50'
              : 'bg-[#f06422]/10 text-[#d4561d] hover:bg-[#f06422]/20 border border-[#f06422]/20 hover:border-[#f06422]/40'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill={sandboxOpen ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="6,3 20,12 6,21" />
          </svg>
          {sandboxOpen ? 'Close Sandbox' : 'Test Workflow'}
        </button>
      </header>

      {/* ── Tab Bar ── */}
      <TabBar />

      {/* ── Main Layout ── */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        <Sidebar />
        <div className="flex-1 relative">
          <WorkflowCanvas />
        </div>
        {/* Right panel — either Properties or Sandbox */}
        {sandboxOpen ? <SandboxPanel /> : <PropertiesPanel />}
      </main>

      {/* ── Status Bar ── */}
      <StatusBar />

      {/* ── Signature ── */}
      <div className="fixed bottom-9 md:bottom-9 left-2 md:left-3 z-50">
        <div className="glass rounded-full px-2 md:px-3 py-0.5 flex items-center gap-1.5 shadow-md">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-soft-pulse shrink-0"></div>
          <span className="text-[9px] md:text-[10px] font-medium text-slate-500 truncate max-w-[200px] md:max-w-none">
            Built for <span className="text-[#f06422] font-bold">Tredence</span> by <a href="https://aerianket.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-bold hover:text-[#f06422] transition-colors underline decoration-slate-300 hover:decoration-[#f06422] underline-offset-2">Anket</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
