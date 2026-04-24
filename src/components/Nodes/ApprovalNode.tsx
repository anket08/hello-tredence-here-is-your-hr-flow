import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type { ApprovalWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

const ApprovalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="10" r="4" />
    <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    <polyline points="15,8 17,10 21,6" strokeLinejoin="round" />
  </svg>
);

export const ApprovalNode: React.FC<NodeProps<ApprovalWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="approval" typeLabel="APPROVAL" title={data.title || 'Approval'} icon={<ApprovalIcon />} selected={selected} accentColor="#f59e0b" validationError={getNodeError(id)}>
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M5 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5" strokeLinecap="round" /></svg>
        <span className="text-[11px] text-slate-500">{data.approverRole || 'Manager'}</span>
      </div>
    </BaseNode>
  );
};
