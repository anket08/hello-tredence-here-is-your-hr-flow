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
    <BaseNode id={id} type="approval" title={data.title || 'Approval'} icon={<ApprovalIcon />} selected={selected} accentColor="#f59e0b" accentBg="bg-amber-50/80" validationError={getNodeError(id)}>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-slate-600">Role: <span className="font-bold text-amber-700">👔 {data.approverRole || 'Manager'}</span></div>
        {data.autoApproveThreshold !== undefined && data.autoApproveThreshold > 0 && (
          <div className="text-[10px] text-slate-400">⏰ Auto-approve after {data.autoApproveThreshold} days</div>
        )}
      </div>
    </BaseNode>
  );
};
