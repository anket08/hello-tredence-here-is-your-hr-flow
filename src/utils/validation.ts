import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export interface ValidationError {
  nodeId: string;
  message: string;
  severity: 'error' | 'warning';
}

export function validateWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]): ValidationError[] {
  const errors: ValidationError[] = [];

  // 1. Must have exactly one Start node
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push({ nodeId: '', message: 'No Start node found', severity: 'error' });
  } else if (startNodes.length > 1) {
    startNodes.forEach((n) =>
      errors.push({ nodeId: n.id, message: 'Multiple Start nodes', severity: 'error' })
    );
  }

  // 2. Must have at least one End node
  const endNodes = nodes.filter((n) => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push({ nodeId: '', message: 'No End node found', severity: 'warning' });
  }

  // 3. Disconnected nodes (no incoming AND no outgoing edges, except Start/End)
  const connectedSources = new Set(edges.map((e) => e.source));
  const connectedTargets = new Set(edges.map((e) => e.target));

  nodes.forEach((node) => {
    const hasOutgoing = connectedSources.has(node.id);
    const hasIncoming = connectedTargets.has(node.id);

    if (node.type === 'start' && !hasOutgoing) {
      errors.push({ nodeId: node.id, message: 'Start node has no outgoing connection', severity: 'warning' });
    } else if (node.type === 'end' && !hasIncoming) {
      errors.push({ nodeId: node.id, message: 'End node has no incoming connection', severity: 'warning' });
    } else if (node.type !== 'start' && node.type !== 'end') {
      if (!hasIncoming && !hasOutgoing) {
        errors.push({ nodeId: node.id, message: 'Node is disconnected', severity: 'warning' });
      } else if (!hasIncoming) {
        errors.push({ nodeId: node.id, message: 'No incoming connection', severity: 'warning' });
      } else if (!hasOutgoing) {
        errors.push({ nodeId: node.id, message: 'No outgoing connection', severity: 'warning' });
      }
    }
  });

  // 4. Missing required fields
  nodes.forEach((node) => {
    if (!node.data.title || (node.data.title as string).trim() === '') {
      errors.push({ nodeId: node.id, message: 'Missing title', severity: 'error' });
    }
  });

  return errors;
}
