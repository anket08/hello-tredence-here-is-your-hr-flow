import React from 'react';
import type { NodeType } from '../../types/workflow';

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType, title: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/title', title);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeItems = [
    {
      type: 'start' as NodeType, title: 'Start Event', desc: 'Workflow entry point',
      color: '#10b981', lightBg: 'bg-emerald-50', hoverBg: 'hover:bg-emerald-100/80',
      borderHover: 'hover:border-emerald-300',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sidebar-icon">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" className="icon-circle" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" className="icon-inner" />
        </svg>
      ),
    },
    {
      type: 'task' as NodeType, title: 'Human Task', desc: 'Manual task assignment',
      color: '#3b82f6', lightBg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100/80',
      borderHover: 'hover:border-blue-300',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sidebar-icon">
          <rect x="4" y="3" width="16" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" className="icon-circle" />
          <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="icon-line-1" />
          <line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="icon-line-2" />
          <line x1="8" y1="17" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="icon-line-3" />
        </svg>
      ),
    },
    {
      type: 'approval' as NodeType, title: 'Approval', desc: 'Manager / HR approval',
      color: '#f59e0b', lightBg: 'bg-amber-50', hoverBg: 'hover:bg-amber-100/80',
      borderHover: 'hover:border-amber-300',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sidebar-icon">
          <circle cx="12" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="2" className="icon-circle" />
          <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="icon-path" />
          <polyline points="15,8 17,10 21,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-check" />
        </svg>
      ),
    },
    {
      type: 'automated' as NodeType, title: 'Automated Step', desc: 'System action',
      color: '#8b5cf6', lightBg: 'bg-violet-50', hoverBg: 'hover:bg-violet-100/80',
      borderHover: 'hover:border-violet-300',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sidebar-icon">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="icon-bolt" />
        </svg>
      ),
    },
    {
      type: 'end' as NodeType, title: 'End Event', desc: 'Workflow completion',
      color: '#ef4444', lightBg: 'bg-rose-50', hoverBg: 'hover:bg-rose-100/80',
      borderHover: 'hover:border-rose-300',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 sidebar-icon">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" className="icon-circle" />
          <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" className="icon-inner" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-56 glass-sidebar flex flex-col h-full z-10 shrink-0">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Node Types</h2>
        <p className="text-[9px] text-slate-400 mt-0.5">Drag onto the canvas</p>
      </div>
      <div className="px-3 pb-4 flex-1 overflow-y-auto flex flex-col gap-1.5">
        {nodeItems.map((node) => (
          <div
            key={node.type}
            className={`group flex items-center gap-3 px-3 py-3 rounded-xl cursor-grab 
              bg-white/40 border border-transparent ${node.hoverBg} ${node.borderHover}
              transition-all duration-200 active:cursor-grabbing sidebar-node-item`}
            onDragStart={(event) => onDragStart(event, node.type, node.title)}
            draggable
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-md"
              style={{ background: node.color, color: '#fff' }}
            >
              {node.icon}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[12px] text-slate-700 group-hover:text-slate-900 transition-colors">{node.title}</div>
              <div className="text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors">{node.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
