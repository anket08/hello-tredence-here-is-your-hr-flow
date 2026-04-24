import React from 'react';
import type { NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { BaseNode } from './BaseNode';
import type { AutomatedWorkflowNode } from '../../types/workflow';

export const AutomatedNode: React.FC<NodeProps<AutomatedWorkflowNode>> = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      type="automated"
      title={data.title || 'Automated Step'}
      icon={<Zap size={15} />}
      selected={selected}
      accentColor="#8b5cf6"
      accentBg="bg-violet-50/80"
    >
      {data.actionId ? (
        <span className="inline-block text-[11px] bg-violet-100/70 text-violet-700 px-2 py-0.5 rounded-md font-semibold">
          {data.actionId}
        </span>
      ) : (
        <span className="text-[11px] text-slate-400 italic">No action set</span>
      )}
    </BaseNode>
  );
};
