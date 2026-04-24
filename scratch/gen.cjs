const fs = require('fs');

const baseTemplates = [
  { id: 'onboarding', name: 'Employee Onboarding', desc: 'Standard new hire onboarding workflow', icon: '👋' },
  { id: 'leave', name: 'Leave Approval', desc: 'Employee leave request and approval flow', icon: '✈️' },
  { id: 'offboarding', name: 'Employee Offboarding', desc: 'Standard exit and offboarding workflow', icon: '📦' },
  { id: 'performance', name: 'Performance Review', desc: 'Quarterly performance evaluation cycle', icon: '📊' },
  { id: 'expense', name: 'Expense Reimbursement', desc: 'Submit and approve expense claims', icon: '💰' },
  { id: 'promotion', name: 'Employee Promotion', desc: 'Process for reviewing and approving promotions', icon: '🚀' },
  { id: 'travel', name: 'Business Travel Request', desc: 'Workflow for booking and approving business trips', icon: '🚆' },
  { id: 'incident', name: 'Workplace Incident Report', desc: 'Report and investigate workplace incidents', icon: '⚠️' },
  { id: 'training', name: 'Training Enrollment', desc: 'Request and approve employee training programs', icon: '📚' },
  { id: 'hardware', name: 'Hardware Request', desc: 'Request new IT hardware or replacements', icon: '💻' },
  { id: 'software', name: 'Software License', desc: 'Request access to new software tools', icon: '🔑' },
  { id: 'relocation', name: 'Employee Relocation', desc: 'Manage logistics for employee relocation', icon: '🌍' },
  { id: 'maternity', name: 'Maternity/Paternity Leave', desc: 'Process extended parental leave requests', icon: '👶' },
  { id: 'grievance', name: 'Grievance Resolution', desc: 'Formal process for employee grievances', icon: '⚖️' },
  { id: 'referral', name: 'Employee Referral', desc: 'Submit and track candidate referrals', icon: '🤝' },
  { id: 'bonus', name: 'Bonus Distribution', desc: 'Calculate and approve annual bonuses', icon: '💵' },
  { id: 'probation', name: 'Probation Review', desc: 'End of probation assessment and confirmation', icon: '✅' },
  { id: 'contract', name: 'Contract Renewal', desc: 'Review and renew employee contracts', icon: '📄' },
  { id: 'salary', name: 'Salary Advance Request', desc: 'Process early salary advance requests', icon: '🏦' },
  { id: 'wfh', name: 'Work From Home Request', desc: 'Apply for permanent or temporary WFH', icon: '🏠' },
  { id: 'survey', name: 'Employee Engagement Survey', desc: 'Conduct and analyze engagement surveys', icon: '📝' },
  { id: 'appraisal', name: 'Annual Appraisal', desc: 'Year-end comprehensive performance appraisal', icon: '🎯' },
  { id: 'transfer', name: 'Internal Department Transfer', desc: 'Move an employee between departments', icon: '🔄' },
  { id: 'awards', name: 'Employee Recognition', desc: 'Nominate and approve employee awards', icon: '🏆' },
  { id: 'benefits', name: 'Benefits Enrollment', desc: 'Annual health and benefits enrollment', icon: '🏥' },
  { id: 'visa', name: 'Visa Processing', desc: 'Manage work visa applications and renewals', icon: '🛂' },
  { id: 'policy', name: 'Policy Acknowledgement', desc: 'Ensure employees read new company policies', icon: '📜' },
  { id: 'audit', name: 'HR Compliance Audit', desc: 'Regular auditing of HR processes and data', icon: '🔍' },
  { id: 'budget', name: 'HR Budget Approval', desc: 'Annual HR department budget planning', icon: '📈' },
  { id: 'feedback', name: '360 Degree Feedback', desc: 'Collect peer and manager feedback', icon: '💬' },
];

const nodes = `[
      { id: 's1', type: 'start', position: { x: 300, y: 40 }, data: { type: 'start', title: 'Start Workflow' } },
      { id: 't1', type: 'task', position: { x: 300, y: 160 }, data: { type: 'task', title: 'Submit Request', assignee: 'Employee' } },
      { id: 'a1', type: 'approval', position: { x: 300, y: 300 }, data: { type: 'approval', title: 'Review', approverRole: 'Manager' } },
      { id: 'au1', type: 'automated', position: { x: 300, y: 440 }, data: { type: 'automated', title: 'Notify HR', actionId: 'send_email' } },
      { id: 'e1', type: 'end', position: { x: 300, y: 580 }, data: { type: 'end', title: 'Workflow Complete', isSummary: true } },
    ]`;

const edges = `[
      { id: 'e-s1-t1', source: 's1', target: 't1', animated: true },
      { id: 'e-t1-a1', source: 't1', target: 'a1', animated: true },
      { id: 'e-a1-au1', source: 'a1', target: 'au1', animated: true },
      { id: 'e-au1-e1', source: 'au1', target: 'e1', animated: true },
    ]`;

let output = `import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export const workflowTemplates: WorkflowTemplate[] = [\n`;

for (let i = 0; i < baseTemplates.length; i++) {
  const t = baseTemplates[i];
  output += `  {
    id: '${t.id}',
    name: '${t.name}',
    description: '${t.desc}',
    icon: '${t.icon}',
    nodes: ${nodes},
    edges: ${edges},
  },
`;
}

output += `];\n`;

fs.writeFileSync('src/data/templates.ts', output);
console.log('Successfully wrote 30 templates to src/data/templates.ts');
