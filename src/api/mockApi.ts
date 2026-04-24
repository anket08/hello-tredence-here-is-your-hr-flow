export interface AutomatedAction {
  id: string;
  label: string;
  params: string[];
}

export const fetchAutomations = async (): Promise<AutomatedAction[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
    { id: "notify_slack", label: "Notify Slack Channel", params: ["channel", "message"] },
  ];
};

export const simulateWorkflow = async (workflowData: any): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const { nodes, edges } = workflowData;
  const executionLog: string[] = [];
  
  // Basic validation
  if (!nodes || nodes.length === 0) {
    return { success: false, log: ["Error: Workflow has no nodes."] };
  }

  const startNode = nodes.find((n: any) => n.type === 'start');
  if (!startNode) {
    return { success: false, log: ["Error: Missing Start Node."] };
  }

  // Find disconnected nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge: any) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });
  
  // A workflow graph traversal (simplified linear path assumption for the sandbox)
  let currentNode = startNode;
  let hasEndNode = false;
  let steps = 0;
  
  executionLog.push(`[System] Starting simulation from: ${startNode.data?.title || 'Start Node'}`);
  
  while (currentNode && steps < 100) {
    steps++;
    const nextEdge = edges.find((e: any) => e.source === currentNode.id);
    
    if (!nextEdge) {
      if (currentNode.type !== 'end') {
        executionLog.push(`[Warning] Workflow ended unexpectedly at ${currentNode.data?.title} (No path forward)`);
      } else {
        executionLog.push(`[System] Reached End Node: ${currentNode.data?.title || 'End'}. Workflow completed.`);
        hasEndNode = true;
      }
      break;
    }
    
    const nextNode = nodes.find((n: any) => n.id === nextEdge.target);
    if (!nextNode) {
      executionLog.push(`[Error] Broken connection from node ${currentNode.id}`);
      break;
    }
    
    // Simulate execution step based on node type
    switch(nextNode.type) {
      case 'task':
        executionLog.push(`[Task] Assigned '${nextNode.data?.title}' to ${nextNode.data?.assignee || 'Unassigned'}`);
        break;
      case 'approval':
        executionLog.push(`[Approval] Waiting for approval from role: ${nextNode.data?.approverRole || 'Manager'} for '${nextNode.data?.title}'`);
        break;
      case 'automated':
        executionLog.push(`[System Action] Executing ${nextNode.data?.actionId || 'action'} for '${nextNode.data?.title}'`);
        break;
      case 'end':
        executionLog.push(`[System] Reached End Node: ${nextNode.data?.title || 'End'}. Workflow completed.`);
        hasEndNode = true;
        break;
      default:
        executionLog.push(`[Unknown] Reached an unknown node type.`);
    }
    
    currentNode = nextNode;
    if (currentNode.type === 'end') {
      break;
    }
  }

  if (!hasEndNode) {
    executionLog.push(`[Warning] Workflow simulation finished but no End Node was reached.`);
  }

  return { success: true, log: executionLog };
};
