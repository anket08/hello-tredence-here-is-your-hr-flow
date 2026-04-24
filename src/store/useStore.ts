import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { Connection, EdgeChange, NodeChange } from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../types/workflow';

// ─── Single Workflow Tab ───
export interface WorkflowTab {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// ─── Store Shape ───
export interface StoreState {
  tabs: WorkflowTab[];
  activeTabId: string;
  selectedNodeId: string | null;

  // Tab actions
  addTab: () => void;
  removeTab: (id: string) => void;
  renameTab: (id: string, name: string) => void;
  setActiveTab: (id: string) => void;

  // Canvas / node actions (always operate on the active tab)
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNode: (id: string | null) => void;
  deleteSelectedElements: () => void;
  loadSampleWorkflow: () => void;
}

// ─── Helpers ───
let tabCounter = 1;
const makeId = () => `tab-${Date.now()}-${tabCounter++}`;

const defaultTab: WorkflowTab = {
  id: 'tab-main',
  name: 'Main Workflow',
  nodes: [
    { id: 'start-1', type: 'start', position: { x: 250, y: 60 }, data: { type: 'start', title: 'Onboarding Start' } },
  ],
  edges: [],
};

const sampleNodes: WorkflowNode[] = [
  { id: 'start-1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Onboarding Start' } },
  { id: 'task-1', type: 'task', position: { x: 300, y: 180 }, data: { type: 'task', title: 'Collect Documents', assignee: 'HR Intern', description: 'Collect ID proof, tax forms, and offer letter acknowledgement.' } },
  { id: 'approval-1', type: 'approval', position: { x: 300, y: 330 }, data: { type: 'approval', title: 'Manager Review', approverRole: 'Manager' } },
  { id: 'auto-1', type: 'automated', position: { x: 300, y: 480 }, data: { type: 'automated', title: 'Send Welcome Email', actionId: 'send_email', actionParams: { to: 'new_hire@tredence.com' } } },
  { id: 'end-1', type: 'end', position: { x: 300, y: 620 }, data: { type: 'end', title: 'Process Complete', endMessage: 'Onboarding finished successfully.', isSummary: true } },
];
const sampleEdges: WorkflowEdge[] = [
  { id: 'e1-2', source: 'start-1', target: 'task-1' },
  { id: 'e2-3', source: 'task-1', target: 'approval-1' },
  { id: 'e3-4', source: 'approval-1', target: 'auto-1' },
  { id: 'e4-5', source: 'auto-1', target: 'end-1' },
];

// ─── Helper to update the active tab inside tabs[] ───
function updateActiveTab(tabs: WorkflowTab[], activeTabId: string, patch: Partial<WorkflowTab>): WorkflowTab[] {
  return tabs.map((t) => (t.id === activeTabId ? { ...t, ...patch } : t));
}

function getActive(tabs: WorkflowTab[], id: string): WorkflowTab {
  return tabs.find((t) => t.id === id) || tabs[0];
}

// ─── Store ───
export const useStore = create<StoreState>((set, get) => ({
  tabs: [defaultTab],
  activeTabId: defaultTab.id,
  selectedNodeId: null,

  // ── Tab management ──
  addTab: () => {
    const id = makeId();
    const newTab: WorkflowTab = {
      id,
      name: `Workflow ${get().tabs.length + 1}`,
      nodes: [{ id: 'start-1', type: 'start', position: { x: 250, y: 60 }, data: { type: 'start', title: 'Start' } }],
      edges: [],
    };
    set({ tabs: [...get().tabs, newTab], activeTabId: id, selectedNodeId: null });
  },

  removeTab: (id: string) => {
    const tabs = get().tabs;
    if (tabs.length <= 1) return; // always keep at least one
    const remaining = tabs.filter((t) => t.id !== id);
    const newActive = get().activeTabId === id ? remaining[0].id : get().activeTabId;
    set({ tabs: remaining, activeTabId: newActive, selectedNodeId: null });
  },

  renameTab: (id: string, name: string) => {
    set({ tabs: get().tabs.map((t) => (t.id === id ? { ...t, name } : t)) });
  },

  setActiveTab: (id: string) => {
    set({ activeTabId: id, selectedNodeId: null });
  },

  // ── Canvas actions (operate on active tab) ──
  onNodesChange: (changes: NodeChange[]) => {
    const { tabs, activeTabId } = get();
    const active = getActive(tabs, activeTabId);
    set({ tabs: updateActiveTab(tabs, activeTabId, { nodes: applyNodeChanges(changes, active.nodes) as WorkflowNode[] }) });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    const { tabs, activeTabId } = get();
    const active = getActive(tabs, activeTabId);
    set({ tabs: updateActiveTab(tabs, activeTabId, { edges: applyEdgeChanges(changes, active.edges) as WorkflowEdge[] }) });
  },

  onConnect: (connection: Connection) => {
    const { tabs, activeTabId } = get();
    const active = getActive(tabs, activeTabId);
    set({ tabs: updateActiveTab(tabs, activeTabId, { edges: addEdge(connection, active.edges) as WorkflowEdge[] }) });
  },

  addNode: (node: WorkflowNode) => {
    const { tabs, activeTabId } = get();
    const active = getActive(tabs, activeTabId);
    set({ tabs: updateActiveTab(tabs, activeTabId, { nodes: [...active.nodes, node] }) });
  },

  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => {
    const { tabs, activeTabId } = get();
    const active = getActive(tabs, activeTabId);
    set({
      tabs: updateActiveTab(tabs, activeTabId, {
        nodes: active.nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } as WorkflowNode : n)),
      }),
    });
  },

  setSelectedNode: (id: string | null) => set({ selectedNodeId: id }),

  deleteSelectedElements: () => {
    const { tabs, activeTabId, selectedNodeId } = get();
    if (!selectedNodeId) return;
    const active = getActive(tabs, activeTabId);
    set({
      tabs: updateActiveTab(tabs, activeTabId, {
        nodes: active.nodes.filter((n) => n.id !== selectedNodeId),
        edges: active.edges.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId),
      }),
      selectedNodeId: null,
    });
  },

  loadSampleWorkflow: () => {
    const { tabs, activeTabId } = get();
    set({
      tabs: updateActiveTab(tabs, activeTabId, { nodes: sampleNodes, edges: sampleEdges }),
      selectedNodeId: null,
    });
  },
}));
