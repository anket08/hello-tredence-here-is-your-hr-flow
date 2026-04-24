import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type { TaskWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

const TaskIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <line x1="8" y1="9" x2="16" y2="9" strokeWidth="1.5" />
    <line x1="8" y1="13" x2="14" y2="13" strokeWidth="1.5" />
    <line x1="8" y1="17" x2="11" y2="17" strokeWidth="1.5" />
  </svg>
);

export const TaskNode: React.FC<NodeProps<TaskWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="task" typeLabel="TASK" title={data.title || 'Task'} icon={<TaskIcon />} selected={selected} accentColor="#3b82f6" validationError={getNodeError(id)}>
      <div className="flex flex-col gap-1">
        {data.description && <p className="text-[10px] text-slate-400 line-clamp-2">{data.description}</p>}
        <div className="flex items-center gap-1.5 mt-0.5">
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M5 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5" strokeLinecap="round" /></svg>
          <span className="text-[11px] text-slate-500 italic">{data.assignee || 'Assign person...'}</span>
        </div>
      </div>
    </BaseNode>
  );
};
