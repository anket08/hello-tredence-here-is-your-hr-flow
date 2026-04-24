import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { ShieldCheck } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { ApprovalWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

export const ApprovalNode: React.FC<NodeProps<ApprovalWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="approval" title={data.title || 'Approval'} icon={<ShieldCheck size={15} />} selected={selected} accentColor="#f59e0b" accentBg="bg-amber-50/80" validationError={getNodeError(id)}>
      <div className="flex flex-col gap-1">
        <div className="text-[11px] text-slate-600">Role: <span className="font-bold text-amber-700">{data.approverRole || 'Manager'}</span></div>
        {data.autoApproveThreshold !== undefined && data.autoApproveThreshold > 0 && (
          <div className="text-[10px] text-slate-400">Auto-approve after {data.autoApproveThreshold} days</div>
        )}
      </div>
    </BaseNode>
  );
};
