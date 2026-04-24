import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../Nodes';
import { useStore } from '../../store/useStore';

export const WorkflowCanvas: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const nodes = activeTab.nodes;
  const edges = activeTab.edges;

  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);
  const setSelectedNode = useStore((s) => s.setSelectedNode);
  const addNode = useStore((s) => s.addNode);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const title = event.dataTransfer.getData('application/title');

      if (!type) return;

      const position = { x: event.clientX - 250, y: event.clientY - 60 };
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { type, title },
      } as any; // Cast to any to bypass strict discriminated union checking when dropping

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="w-full h-full relative" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={(params) => {
          setSelectedNode(params.nodes[0]?.id || null);
        }}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        className="bg-transparent"
      >
        <Background color="#4a3c2f" gap={24} size={2} className="opacity-40" />
        <Controls
          className="!bg-[#1a1410]/80 !border-white/10 !backdrop-blur-md fill-white text-white shadow-lg"
          position="bottom-left"
          style={{ marginBottom: '40px', fill: 'white' }}
        />
        <MiniMap
          className="!bg-[#1a1410]/80 !border !border-white/10 !backdrop-blur-md rounded-xl overflow-hidden shadow-lg"
          nodeColor={(n) => {
            switch (n.type) {
              case 'start': return '#10b981';
              case 'task': return '#3b82f6';
              case 'approval': return '#f59e0b';
              case 'automated': return '#8b5cf6';
              case 'end': return '#ef4444';
              default: return '#332920';
            }
          }}
          maskColor="rgba(0,0,0,0.6)"
        />
        <Panel position="top-right" className="bg-[#1a1410]/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[10px] font-medium text-white/50 tracking-widest uppercase">
          Tredence Engine Active
        </Panel>
      </ReactFlow>
    </div>
  );
};
