import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import type { NodeType, WorkflowNode } from '../../types/workflow';

interface BaseNodeProps {
  id: string;
  title: string;
  typeLabel: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  selected?: boolean;
  type: string;
  accentColor: string;
  validationError?: string;
}

const quickAddItems: { type: NodeType; label: string; color: string; icon: React.ReactNode }[] = [
  {
    type: 'task', label: 'Task', color: '#3b82f6',
    icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="3" width="16" height="18" rx="3" /><line x1="8" y1="9" x2="16" y2="9" strokeLinecap="round" /><line x1="8" y1="13" x2="14" y2="13" strokeLinecap="round" /></svg>,
  },
  {
    type: 'approval', label: 'Approval', color: '#f59e0b',
    icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="10" r="4" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" strokeLinecap="round" /></svg>,
  },
  {
    type: 'automated', label: 'Auto', color: '#8b5cf6',
    icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>,
  },
  {
    type: 'end', label: 'End', color: '#ef4444',
    icon: <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="9" /><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" stroke="none" /></svg>,
  },
];

export const BaseNode: React.FC<BaseNodeProps> = ({ id, title, typeLabel, icon, children, selected, type, accentColor, validationError }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const addNode = useStore((s) => s.addNode);
  const onConnect = useStore((s) => s.onConnect);
  const { getNode } = useReactFlow();

  const handleQuickAdd = (newType: NodeType) => {
    const currentNode = getNode(id);
    if (!currentNode) return;
    const newId = uuidv4();
    const newNode: WorkflowNode = {
      id: newId,
      type: newType,
      position: { x: currentNode.position.x, y: currentNode.position.y + 140 },
      data: { type: newType, title: newType.charAt(0).toUpperCase() + newType.slice(1) } as any,
    };
    addNode(newNode);
    onConnect({ source: id, target: newId, sourceHandle: null, targetHandle: null });
    setShowQuickAdd(false);
  };

  return (
    // Padding-bottom creates an invisible hover bridge to the toolbar
    <div
      className="relative"
      style={{ paddingBottom: type !== 'end' ? '36px' : '0' }}
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      <div
        className={clsx(
          "rounded-xl w-48 transition-all duration-200 overflow-visible relative",
          selected ? "node-glow" : "shadow-sm hover:shadow-md",
        )}
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: validationError
            ? `2px solid ${accentColor}`
            : selected
              ? `2px solid ${accentColor}`
              : '1px solid rgba(226,232,240,0.6)',
          borderLeftWidth: '3px',
          borderLeftColor: accentColor,
        }}
      >
        {/* Validation badge */}
        {validationError && (
          <div className="absolute -top-2 -right-2 z-10 bg-amber-500 text-white rounded-full p-0.5 shadow-md animate-soft-pulse" title={validationError}>
            <AlertTriangle size={10} />
          </div>
        )}

        {type !== 'start' && (
          <Handle type="target" position={Position.Top} style={{ background: accentColor, border: '2px solid #fff' }} className="!w-2 !h-2" />
        )}

        {/* Node content */}
        <div className="px-3 py-2.5">
          {/* Icon + type label */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentColor }}>
              <span className="text-white">{icon}</span>
            </div>
            <span className="text-[8px] font-extrabold uppercase tracking-[0.12em]" style={{ color: accentColor }}>
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[12px] text-slate-800 leading-tight mb-0.5 truncate">{title}</h3>

          {/* Children content */}
          <div className="text-xs text-slate-500">
            {children}
          </div>
        </div>

        {/* Validation inline */}
        {validationError && (
          <div className="px-3 pb-2 -mt-0.5">
            <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{validationError}</span>
          </div>
        )}

        {type !== 'end' && (
          <Handle type="source" position={Position.Bottom} style={{ background: accentColor, border: '2px solid #fff' }} className="!w-2 !h-2" />
        )}
      </div>

      {/* Quick-add toolbar — connected to node via padding bridge */}
      {type !== 'end' && showQuickAdd && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
          <div className="flex items-center gap-0.5 bg-slate-800/90 backdrop-blur-md rounded-lg px-1.5 py-1 shadow-xl border border-slate-700/50">
            {quickAddItems.map((item) => (
              <button
                key={item.type}
                onClick={() => handleQuickAdd(item.type)}
                className="p-1.5 rounded-md hover:bg-white/15 transition-all"
                title={`Add ${item.label}`}
                style={{ color: item.color }}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
