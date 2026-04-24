import React from 'react';
import { PlayCircle, ClipboardList, ShieldCheck, Zap, CircleStop } from 'lucide-react';
import type { NodeType } from '../../types/workflow';

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType, title: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/title', title);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeItems = [
    { type: 'start' as NodeType, title: 'Start Event', icon: <PlayCircle size={16} />, color: '#10b981', bg: 'bg-emerald-500/10', desc: 'Workflow entry point' },
    { type: 'task' as NodeType, title: 'Human Task', icon: <ClipboardList size={16} />, color: '#3b82f6', bg: 'bg-blue-500/10', desc: 'Manual task assignment' },
    { type: 'approval' as NodeType, title: 'Approval', icon: <ShieldCheck size={16} />, color: '#f59e0b', bg: 'bg-amber-500/10', desc: 'Manager / HR approval' },
    { type: 'automated' as NodeType, title: 'Automated Step', icon: <Zap size={16} />, color: '#8b5cf6', bg: 'bg-violet-500/10', desc: 'System action' },
    { type: 'end' as NodeType, title: 'End Event', icon: <CircleStop size={16} />, color: '#ef4444', bg: 'bg-rose-500/10', desc: 'Workflow completion' },
  ];

  return (
    <aside className="w-56 glass-sidebar flex flex-col h-full z-10 shrink-0">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest">Components</h2>
      </div>
      <div className="px-3 pb-4 flex-1 overflow-y-auto flex flex-col gap-2">
        {nodeItems.map((node) => (
          <div
            key={node.type}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-grab hover:shadow-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all active:scale-[0.97]"
            onDragStart={(event) => onDragStart(event, node.type, node.title)}
            draggable
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm shrink-0"
              style={{ background: node.color }}
            >
              <span className="text-white">{node.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[12px] text-white/90 truncate">{node.title}</div>
              <div className="text-[10px] text-white/50 truncate">{node.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
