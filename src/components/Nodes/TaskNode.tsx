import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { ClipboardList } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { TaskWorkflowNode } from '../../types/workflow';
import { useValidation } from '../../hooks/useValidation';

export const TaskNode: React.FC<NodeProps<TaskWorkflowNode>> = ({ id, data, selected }) => {
  const { getNodeError } = useValidation();
  return (
    <BaseNode id={id} type="task" title={data.title || 'Task'} icon={<ClipboardList size={15} />} selected={selected} accentColor="#3b82f6" accentBg="bg-blue-50/80" validationError={getNodeError(id)}>
      <div className="flex flex-col gap-1.5">
        {data.description && <p className="text-[11px] text-slate-500 line-clamp-2">{data.description}</p>}
        <div className="flex items-center justify-between gap-2 mt-1">
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md truncate max-w-[100px]">{data.assignee || 'Unassigned'}</span>
          {data.dueDate && <span className="text-[10px] text-slate-400">{data.dueDate}</span>}
        </div>
      </div>
    </BaseNode>
  );
};
