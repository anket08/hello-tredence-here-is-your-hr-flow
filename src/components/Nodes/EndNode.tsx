import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type { EndWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

const StopIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

export const EndNode: React.FC<NodeProps<EndWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="end" title={data.title || 'End'} icon={<StopIcon />} selected={selected} accentColor="#ef4444" accentBg="bg-rose-50/80" validationError={getNodeError(id)}>
      {data.endMessage ? (
        <p className="text-[11px] text-slate-500 italic">"{data.endMessage}"</p>
      ) : (
        <span className="text-[11px] text-slate-400 italic">No message</span>
      )}
      {data.isSummary && (
        <div className="mt-1.5 text-[10px] font-bold text-rose-600 flex items-center gap-1">
          📊 Summary Report
        </div>
      )}
    </BaseNode>
  );
};
