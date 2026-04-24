import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import { useStore } from '../../store/useStore';
import { nodeTypes } from '../Nodes';
import type { NodeType, WorkflowNode } from '../../types/workflow';

const WorkflowCanvasInner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const edges = activeTab.edges;
  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);
  const addNode = useStore((s) => s.addNode);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const deleteSelectedElements = useStore((s) => s.deleteSelectedElements);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      const title = event.dataTransfer.getData('application/title');
      if (!type) return;

      // Convert screen coordinates to flow coordinates (accounts for zoom & pan)
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { type, title },
      } as unknown as WorkflowNode;

      addNode(newNode);
    },
    [addNode, screenToFlowPosition]
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: any[] }) => {
    setSelectedNode(nodes.length === 1 ? nodes[0].id : null);
  }, [setSelectedNode]);

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Delete' || event.key === 'Backspace') deleteSelectedElements();
  }, [deleteSelectedElements]);

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper} onKeyDown={onKeyDown} tabIndex={0}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={["Backspace", "Delete"]}
        style={{ background: 'transparent' }}
      >
        <Background gap={20} size={1} color="#cbd5e1" />
        <Controls className="!bg-white/80 !backdrop-blur-lg !border-slate-200/60 !rounded-xl !shadow-lg" />
        <MiniMap
          className="!border-slate-200/60 !shadow-lg !rounded-xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.8)' }}
          nodeColor={(node) => {
            switch (node.type) {
              case 'start': return '#10b981';
              case 'task': return '#3b82f6';
              case 'approval': return '#f59e0b';
              case 'automated': return '#8b5cf6';
              case 'end': return '#ef4444';
              default: return '#cbd5e1';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas: React.FC = () => (
  <ReactFlowProvider>
    <WorkflowCanvasInner />
  </ReactFlowProvider>
);
