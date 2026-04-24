import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { Connection, EdgeChange, NodeChange } from '@xyflow/react';
import type { WorkflowState, WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../types/workflow';

export const initialNodes: WorkflowNode[] = [
  {
    id: 'start-1',
    type: 'start',
    position: { x: 250, y: 50 },
    data: { type: 'start', title: 'Onboarding Start' },
  },
];

export const sampleNodes: WorkflowNode[] = [
  { id: 'start-1', type: 'start', position: { x: 250, y: 50 }, data: { type: 'start', title: 'Onboarding Start' } },
  { id: 'task-1', type: 'task', position: { x: 250, y: 150 }, data: { type: 'task', title: 'Collect Documents', assignee: 'HR Intern', description: 'Collect ID and tax forms.' } },
  { id: 'approval-1', type: 'approval', position: { x: 250, y: 250 }, data: { type: 'approval', title: 'Manager Review', approverRole: 'Manager' } },
  { id: 'auto-1', type: 'automated', position: { x: 250, y: 350 }, data: { type: 'automated', title: 'Send Welcome Email', actionId: 'send_email', actionParams: { to: 'new_hire@company.com' } } },
  { id: 'end-1', type: 'end', position: { x: 250, y: 450 }, data: { type: 'end', title: 'Process Complete', endMessage: 'Onboarding finished successfully.', isSummary: true } }
];

export const sampleEdges: WorkflowEdge[] = [
  { id: 'e1-2', source: 'start-1', target: 'task-1' },
  { id: 'e2-3', source: 'task-1', target: 'approval-1' },
  { id: 'e3-4', source: 'approval-1', target: 'auto-1' },
  { id: 'e4-5', source: 'auto-1', target: 'end-1' }
];

export const useStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as WorkflowEdge[],
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges) as WorkflowEdge[],
    });
  },

  addNode: (node: WorkflowNode) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } } as WorkflowNode;
        }
        return node;
      }),
    });
  },

  setSelectedNode: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  deleteSelectedElements: () => {
    const selectedNodeId = get().selectedNodeId;
    if (selectedNodeId) {
      set({
        nodes: get().nodes.filter((node) => node.id !== selectedNodeId),
        edges: get().edges.filter(
          (edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId
        ),
        selectedNodeId: null,
      });
    }
  },

  loadSampleWorkflow: () => {
    set({
      nodes: sampleNodes,
      edges: sampleEdges,
      selectedNodeId: null,
    });
  },

  getNodes: () => get().nodes,
  getEdges: () => get().edges,
}));
