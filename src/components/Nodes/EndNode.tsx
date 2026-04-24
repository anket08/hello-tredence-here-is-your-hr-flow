import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { CircleStop } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { EndWorkflowNode } from '../../types/workflow';

export const EndNode: React.FC<NodeProps<EndWorkflowNode>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      type="end"
      title={data.title || 'End'}
      icon={<CircleStop size={15} />}
      selected={selected}
      accentColor="#ef4444"
      accentBg="bg-rose-50/80"
    >
      {data.endMessage ? (
        <p className="text-[11px] text-slate-500 italic">"{data.endMessage}"</p>
      ) : (
        <span className="text-[11px] text-slate-400 italic">No message</span>
      )}
      {data.isSummary && (
        <div className="mt-1.5 text-[10px] font-bold text-rose-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Summary Report
        </div>
      )}
    </BaseNode>
  );
};
