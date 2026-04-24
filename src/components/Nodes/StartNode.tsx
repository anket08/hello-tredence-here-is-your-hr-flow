import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type { StartWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

const StartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
  </svg>
);

export const StartNode: React.FC<NodeProps<StartWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="start" typeLabel="START" title={data.title || 'Start'} icon={<StartIcon />} selected={selected} accentColor="#10b981" validationError={getNodeError(id)}>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-soft-pulse"></div>
        <span className="text-[11px] font-semibold text-emerald-700">Entry Point</span>
      </div>
    </BaseNode>
  );
};
