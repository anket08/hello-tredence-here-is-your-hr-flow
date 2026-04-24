import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface NodeHistoryEntry {
  timestamp: number;
  data: Record<string, any>;
}

export interface BaseNodeData extends Record<string, unknown> {
  history?: NodeHistoryEntry[];
}

export interface StartNodeData extends BaseNodeData {
  type: 'start';
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  title: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'automated';
  title: string;
  actionId?: string;
  actionParams?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  type: 'end';
  title?: string;
  endMessage?: string;
  isSummary?: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

export type StartWorkflowNode = Node<StartNodeData, 'start'>;
export type TaskWorkflowNode = Node<TaskNodeData, 'task'>;
export type ApprovalWorkflowNode = Node<ApprovalNodeData, 'approval'>;
export type AutomatedWorkflowNode = Node<AutomatedStepNodeData, 'automated'>;
export type EndWorkflowNode = Node<EndNodeData, 'end'>;

export type WorkflowNode =
  | StartWorkflowNode
  | TaskWorkflowNode
  | ApprovalWorkflowNode
  | AutomatedWorkflowNode
  | EndWorkflowNode;

export type WorkflowEdge = Edge;
