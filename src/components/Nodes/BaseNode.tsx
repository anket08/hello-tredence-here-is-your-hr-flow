import React from 'react';
import { Handle, Position } from '@xyflow/react';
import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';

interface BaseNodeProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  selected?: boolean;
  type: string;
  accentColor: string;
  accentBg: string;
  validationError?: string;
}

export const BaseNode: React.FC<BaseNodeProps> = ({ title, icon, children, selected, type, accentColor, accentBg, validationError }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl w-60 transition-all duration-200 overflow-visible relative",
        selected ? "node-glow" : "shadow-md hover:shadow-lg",
      )}
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: validationError
          ? '2px solid #f59e0b'
          : selected
            ? `2px solid ${accentColor}`
            : '1px solid rgba(226,232,240,0.7)',
      }}
    >
      {/* Validation badge */}
      {validationError && (
        <div className="absolute -top-2 -right-2 z-10 bg-amber-500 text-white rounded-full p-1 shadow-md" title={validationError}>
          <AlertTriangle size={12} />
        </div>
      )}

      {type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: accentColor, border: '2px solid #fff' }}
          className="!w-2.5 !h-2.5"
        />
      )}

      <div className={clsx("flex items-center gap-2.5 px-4 py-2.5 rounded-t-2xl", accentBg)}>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm shrink-0"
          style={{ background: accentColor }}
        >
          <span className="text-white">{icon}</span>
        </div>
        <span className="font-bold text-[13px] text-slate-800 tracking-tight truncate">{title}</span>
      </div>

      <div className="px-4 py-3 text-sm text-slate-600">
        {children}
      </div>

      {/* Validation message inline */}
      {validationError && (
        <div className="px-4 pb-2 -mt-1">
          <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">{validationError}</span>
        </div>
      )}

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
