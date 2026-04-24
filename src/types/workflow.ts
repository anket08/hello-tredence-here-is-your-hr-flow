import type { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface StartNodeData extends Record<string, unknown> {
  type: 'start';
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends Record<string, unknown> {
  type: 'task';
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends Record<string, unknown> {
  type: 'approval';
  title: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedStepNodeData extends Record<string, unknown> {
  type: 'automated';
  title: string;
  actionId?: string;
  actionParams?: Record<string, string>;
}

export interface EndNodeData extends Record<string, unknown> {
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

export interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNode: (id: string | null) => void;
  deleteSelectedElements: () => void;
  loadSampleWorkflow: () => void;
  getNodes: () => WorkflowNode[];
  getEdges: () => WorkflowEdge[];
}
