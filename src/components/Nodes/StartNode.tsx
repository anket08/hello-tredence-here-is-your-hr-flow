import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { PlayCircle } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { StartWorkflowNode } from '../../types/workflow';

export const StartNode: React.FC<NodeProps<StartWorkflowNode>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      type="start"
      title={data.title || 'Start'}
      icon={<PlayCircle size={15} />}
      selected={selected}
      accentColor="#10b981"
      accentBg="bg-emerald-50/80"
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-soft-pulse"></div>
        <span className="text-xs font-semibold text-emerald-700">Entry Point</span>
      </div>
      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <div className="mt-1.5 text-[11px] text-slate-400">
          {Object.keys(data.metadata).length} metadata fields
        </div>
      )}
    </BaseNode>
  );
};
