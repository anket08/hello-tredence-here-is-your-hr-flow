import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'onboarding',
    name: 'Employee Onboarding',
    description: 'Standard new hire onboarding workflow',
    icon: '👋',
    nodes: [
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'New Hire Initiated' } },
      { id: 't1', type: 'task', position: { x: 300, y: 160 }, data: { type: 'task', title: 'Collect Documents', assignee: '-ANKET AERI', description: 'Collect ID proof, address proof, tax forms, and signed offer letter.' } },
      { id: 't2', type: 'task', position: { x: 300, y: 300 }, data: { type: 'task', title: 'Setup IT Access', assignee: 'IT Admin', description: 'Create email, Slack, VPN, and tool access for new employee.' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 440 }, data: { type: 'approval', title: 'Manager Approval', approverRole: 'Manager' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 580 }, data: { type: 'automated', title: 'Send Welcome Email', actionId: 'send_email' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 720 }, data: { type: 'end', title: 'Onboarding Complete', endMessage: 'Employee onboarded successfully.', isSummary: true } },
    ],
    edges: [
      { id: 'e-s1-t1', source: 's1', target: 't1' },
      { id: 'e-t1-t2', source: 't1', target: 't2' },
      { id: 'e-t2-a1', source: 't2', target: 'a1' },
      { id: 'e-a1-au1', source: 'a1', target: 'au1' },
      { id: 'e-au1-e1', source: 'au1', target: 'e1' },
    ],
  },
  {
    id: 'leave',
    name: 'Leave Approval',
    description: 'Employee leave request and approval flow',
    icon: '✈️',
    nodes: [
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Leave Request' } },
      { id: 't1', type: 'task', position: { x: 300, y: 160 }, data: { type: 'task', title: 'Submit Leave Form', assignee: 'Employee', description: 'Fill in leave type, dates, and reason.' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 300 }, data: { type: 'approval', title: 'Manager Approval', approverRole: 'Manager' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 440 }, data: { type: 'automated', title: 'Notify Team', actionId: 'send_slack' } },
      { id: 'au2', type: 'automated', position: { x: 300, y: 560 }, data: { type: 'automated', title: 'Update HRMS', actionId: 'generate_doc' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 700 }, data: { type: 'end', title: 'Leave Processed', endMessage: 'Leave request has been processed.', isSummary: true } },
    ],
    edges: [
      { id: 'e-s1-t1', source: 's1', target: 't1' },
      { id: 'e-t1-a1', source: 't1', target: 'a1' },
      { id: 'e-a1-au1', source: 'a1', target: 'au1' },
      { id: 'e-au1-au2', source: 'au1', target: 'au2' },
      { id: 'e-au2-e1', source: 'au2', target: 'e1' },
    ],
  },
  {
    id: 'offboarding',
    name: 'Employee Offboarding',
    description: 'Standard exit and offboarding workflow',
    icon: '📦',
    nodes: [
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Resignation Received' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 160 }, data: { type: 'approval', title: 'HR Review', approverRole: 'HRBP' } },
      { id: 't1', type: 'task', position: { x: 300, y: 300 }, data: { type: 'task', title: 'Knowledge Transfer', assignee: 'Departing Employee', description: 'Document ongoing projects and hand over to successor.' } },
      { id: 't2', type: 'task', position: { x: 300, y: 440 }, data: { type: 'task', title: 'Asset Return', assignee: 'IT Admin', description: 'Collect laptop, ID card, and revoke all system access.' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 580 }, data: { type: 'automated', title: 'Generate Experience Letter', actionId: 'generate_doc' } },
      { id: 'a2', type: 'approval', position: { x: 300, y: 720 }, data: { type: 'approval', title: 'Final Clearance', approverRole: 'Director' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 860 }, data: { type: 'end', title: 'Exit Complete', endMessage: 'Employee offboarding finalized.', isSummary: true } },
    ],
    edges: [
      { id: 'e-s1-a1', source: 's1', target: 'a1' },
      { id: 'e-a1-t1', source: 'a1', target: 't1' },
      { id: 'e-t1-t2', source: 't1', target: 't2' },
      { id: 'e-t2-au1', source: 't2', target: 'au1' },
      { id: 'e-au1-a2', source: 'au1', target: 'a2' },
      { id: 'e-a2-e1', source: 'a2', target: 'e1' },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Review',
    description: 'Quarterly performance evaluation cycle',
    icon: '📊',
    nodes: [
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Review Cycle Begins' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 160 }, data: { type: 'automated', title: 'Send Self-Review Form', actionId: 'send_email' } },
      { id: 't1', type: 'task', position: { x: 300, y: 300 }, data: { type: 'task', title: 'Employee Self-Review', assignee: 'Employee', description: 'Complete self-assessment form with goals and achievements.' } },
      { id: 't2', type: 'task', position: { x: 300, y: 440 }, data: { type: 'task', title: 'Manager Review', assignee: 'Manager', description: 'Review employee performance and provide rating.' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 580 }, data: { type: 'approval', title: 'HR Calibration', approverRole: 'HRBP' } },
      { id: 'au2', type: 'automated', position: { x: 300, y: 720 }, data: { type: 'automated', title: 'Notify Results', actionId: 'send_slack' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 860 }, data: { type: 'end', title: 'Review Finalized', endMessage: 'Performance review cycle complete.', isSummary: true } },
    ],
    edges: [
      { id: 'e-s1-au1', source: 's1', target: 'au1' },
      { id: 'e-au1-t1', source: 'au1', target: 't1' },
      { id: 'e-t1-t2', source: 't1', target: 't2' },
      { id: 'e-t2-a1', source: 't2', target: 'a1' },
      { id: 'e-a1-au2', source: 'a1', target: 'au2' },
      { id: 'e-au2-e1', source: 'au2', target: 'e1' },
    ],
  },
  {
    id: 'expense',
    name: 'Expense Reimbursement',
    description: 'Submit and approve expense claims',
    icon: '💰',
    nodes: [
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Expense Submitted' } },
      { id: 't1', type: 'task', position: { x: 300, y: 160 }, data: { type: 'task', title: 'Attach Receipts', assignee: 'Employee', description: 'Upload receipts and fill expense details.' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 300 }, data: { type: 'approval', title: 'Manager Approval', approverRole: 'Manager', autoApproveThreshold: 3 } },
      { id: 'a2', type: 'approval', position: { x: 300, y: 440 }, data: { type: 'approval', title: 'Finance Review', approverRole: 'Director' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 580 }, data: { type: 'automated', title: 'Process Payment', actionId: 'generate_doc' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 720 }, data: { type: 'end', title: 'Reimbursement Done', endMessage: 'Expense reimbursed to employee account.' } },
    ],
    edges: [
      { id: 'e-s1-t1', source: 's1', target: 't1' },
      { id: 'e-t1-a1', source: 't1', target: 'a1' },
      { id: 'e-a1-a2', source: 'a1', target: 'a2' },
      { id: 'e-a2-au1', source: 'a2', target: 'au1' },
      { id: 'e-au1-e1', source: 'au1', target: 'e1' },
    ],
  },
];
