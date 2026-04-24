import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type { AutomatedWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </svg>
);

export const AutomatedNode: React.FC<NodeProps<AutomatedWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="automated" typeLabel="AUTOMATED" title={data.title || 'Automated Step'} icon={<BoltIcon />} selected={selected} accentColor="#8b5cf6" validationError={getNodeError(id)}>
      {data.actionId ? (
        <span className="inline-block text-[10px] bg-violet-100/70 text-violet-700 px-2 py-0.5 rounded-md font-semibold">⚡ {data.actionId}</span>
      ) : (
        <span className="text-[10px] text-slate-400 italic">No action set</span>
      )}
    </BaseNode>
  );
};
