import React from 'react';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';

interface BaseNodeProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  selected?: boolean;
  type: string;
  accentColor: string;  // e.g. "#10b981"
  accentBg: string;     // e.g. "bg-emerald-50"
}

export const BaseNode: React.FC<BaseNodeProps> = ({ title, icon, children, selected, type, accentColor, accentBg }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl w-60 transition-all duration-200 overflow-hidden",
        selected ? "node-glow" : "shadow-md hover:shadow-lg",
      )}
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: selected ? `2px solid ${accentColor}` : '1px solid rgba(226,232,240,0.7)',
      }}
    >
      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: accentColor, border: '2px solid #fff' }}
          className="!w-2.5 !h-2.5"
        />
      )}

      {/* Header strip */}
      <div className={clsx("flex items-center gap-2.5 px-4 py-2.5", accentBg)}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm"
          style={{ background: accentColor }}
        >
          <span className="text-white">{icon}</span>
        </div>
        <span className="font-bold text-[13px] text-slate-800 tracking-tight truncate">{title}</span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 text-sm text-slate-600">
        {children}
      </div>

      {type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: accentColor, border: '2px solid #fff' }}
          className="!w-2.5 !h-2.5"
        />
      )}
    </div>
  );
};
