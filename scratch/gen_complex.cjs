const fs = require('fs');

const complexTemplates = [
  {
    id: 'merger_acquisition',
    name: 'M&A HR Integration',
    desc: 'Complex workflow for integrating employees during M&A',
    icon: '🏢',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'M&A Deal Closed' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Data Audit', assignee: 'HR Data Analyst' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Benefits Mapping', assignee: 'Comp & Ben' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Role Harmonization', assignee: 'HRBP' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Exec Review', approverRole: 'VP HR' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Generate Contracts', actionId: 'generate_doc' } },
      { id: 't4', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Townhall Meeting', assignee: 'Leadership' } },
      { id: 'au2', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Send Welcome Kits', actionId: 'send_email' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Integration Complete', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 't2', animated: true },
      { id: 'e3', source: 't1', target: 't3', animated: true },
      { id: 'e4', source: 't2', target: 'a1', animated: true },
      { id: 'e5', source: 't3', target: 'a1', animated: true },
      { id: 'e6', source: 'a1', target: 'au1', animated: true },
      { id: 'e7', source: 'au1', target: 't4', animated: true },
      { id: 'e8', source: 't4', target: 'au2', animated: true },
      { id: 'e9', source: 'au2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'global_relocation',
    name: 'Global Executive Relocation',
    desc: 'Multi-stage approval and logistics for international moves',
    icon: '✈️',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Relocation Initiated' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Budget Approval', approverRole: 'Finance Director' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Visa Processing', assignee: 'Immigration Specialist' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Housing Search', assignee: 'Relocation Agent' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'School Search', assignee: 'Relocation Agent' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Book Flights', actionId: 'generate_doc' } },
      { id: 'a2', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Final Review', approverRole: 'HRBP' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Relocation Complete', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 'a1', animated: true },
      { id: 'e2', source: 'a1', target: 't1', animated: true },
      { id: 'e3', source: 't1', target: 't2', animated: true },
      { id: 'e4', source: 't1', target: 't3', animated: true },
      { id: 'e5', source: 't2', target: 'au1', animated: true },
      { id: 'e6', source: 't3', target: 'au1', animated: true },
      { id: 'e7', source: 'au1', target: 'a2', animated: true },
      { id: 'e8', source: 'a2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'org_restructure',
    name: 'Department Restructuring',
    desc: 'Managing team moves, title changes, and system updates',
    icon: '🔀',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Restructure Plan Approved' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Update Org Chart', assignee: 'HR Ops' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Notify IT Systems', actionId: 'send_slack' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: '1-on-1 Comms', assignee: 'Managers' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Review Comms', approverRole: 'Legal' } },
      { id: 'au2', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Update Payroll', actionId: 'generate_doc' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Restructure Executed', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 'au1', animated: true },
      { id: 'e3', source: 'au1', target: 't2', animated: true },
      { id: 'e4', source: 't2', target: 'a1', animated: true },
      { id: 'e5', source: 'a1', target: 'au2', animated: true },
      { id: 'e6', source: 'au2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'annual_comp',
    name: 'Annual Compensation Cycle',
    desc: 'Complex multi-level approval for merit increases and bonuses',
    icon: '💹',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Cycle Kickoff' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Generate Worksheets', actionId: 'generate_doc' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Manager Input', assignee: 'All Managers' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Director Review', approverRole: 'Director' } },
      { id: 'a2', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Finance Calibration', approverRole: 'Finance' } },
      { id: 'a3', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Exec Signoff', approverRole: 'CEO' } },
      { id: 'au2', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Send Comp Letters', actionId: 'send_email' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Employee Meetings', assignee: 'Managers' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Cycle Closed', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 'au1', animated: true },
      { id: 'e2', source: 'au1', target: 't1', animated: true },
      { id: 'e3', source: 't1', target: 'a1', animated: true },
      { id: 'e4', source: 'a1', target: 'a2', animated: true },
      { id: 'e5', source: 'a2', target: 'a3', animated: true },
      { id: 'e6', source: 'a3', target: 'au2', animated: true },
      { id: 'e7', source: 'au2', target: 't2', animated: true },
      { id: 'e8', source: 't2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'rto_planning',
    name: 'Return to Office Phasing',
    desc: 'Logistics and tracking for phased office returns',
    icon: '🏢',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Phase Declared' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Facility Audit', assignee: 'Facilities' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Seating Plan', assignee: 'HR Ops' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Send Surveys', actionId: 'send_email' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Exceptions Review', approverRole: 'HRBP' } },
      { id: 'au2', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Activate Access Badges', actionId: 'generate_doc' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Phase Complete', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 't2', animated: true },
      { id: 'e3', source: 't2', target: 'au1', animated: true },
      { id: 'e4', source: 'au1', target: 'a1', animated: true },
      { id: 'e5', source: 'a1', target: 'au2', animated: true },
      { id: 'e6', source: 'au2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'layoff_process',
    name: 'Reduction in Force (RIF)',
    desc: 'Highly sensitive, legal-heavy offboarding workflow',
    icon: '⚖️',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'RIF Approved' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Impact Analysis', assignee: 'HR Analyst' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Legal Review', approverRole: 'Legal Counsel' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Generate Severance Docs', actionId: 'generate_doc' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Notification Meetings', assignee: 'HRBP' } },
      { id: 'au2', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Revoke Access', actionId: 'send_slack' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Outplacement Support', assignee: 'External Vendor' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Process Complete', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 'a1', animated: true },
      { id: 'e3', source: 'a1', target: 'au1', animated: true },
      { id: 'e4', source: 'au1', target: 't2', animated: true },
      { id: 'e5', source: 't2', target: 'au2', animated: true },
      { id: 'e6', source: 'au2', target: 't3', animated: true },
      { id: 'e7', source: 't3', target: 'e1', animated: true },
    ]
  },
  {
    id: 'compliance_audit',
    name: 'SOC2 / ISO HR Compliance Audit',
    desc: 'Evidence gathering and approvals for formal audits',
    icon: '🔐',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Audit Triggered' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Alert Data Owners', actionId: 'send_slack' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Gather Training Logs', assignee: 'L&D' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Gather Offboarding Logs', assignee: 'HR Ops' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Internal Review', approverRole: 'Compliance Officer' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Submit to Auditors', assignee: 'Compliance Officer' } },
      { id: 'a2', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Remediation Signoff', approverRole: 'CTO' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Audit Passed', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 'au1', animated: true },
      { id: 'e2', source: 'au1', target: 't1', animated: true },
      { id: 'e3', source: 'au1', target: 't2', animated: true },
      { id: 'e4', source: 't1', target: 'a1', animated: true },
      { id: 'e5', source: 't2', target: 'a1', animated: true },
      { id: 'e6', source: 'a1', target: 't3', animated: true },
      { id: 'e7', source: 't3', target: 'a2', animated: true },
      { id: 'e8', source: 'a2', target: 'e1', animated: true },
    ]
  },
  {
    id: 'leadership_hiring',
    name: 'Executive Leadership Hiring',
    desc: 'High-touch recruitment flow for VP+ roles',
    icon: '👔',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Req Opened' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Search Firm Briefing', assignee: 'Head of TA' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Candidate Shortlist', approverRole: 'CEO' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Board Interviews', assignee: 'Board Members' } },
      { id: 'a2', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Final Selection', approverRole: 'CEO' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Offer Negotiation', assignee: 'External Counsel' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Initiate Background Check', actionId: 'generate_doc' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Executive Hired', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 'a1', animated: true },
      { id: 'e3', source: 'a1', target: 't2', animated: true },
      { id: 'e4', source: 't2', target: 'a2', animated: true },
      { id: 'e5', source: 'a2', target: 't3', animated: true },
      { id: 'e6', source: 't3', target: 'au1', animated: true },
      { id: 'e7', source: 'au1', target: 'e1', animated: true },
    ]
  },
  {
    id: 'harassment_investigation',
    name: 'Workplace Harassment Investigation',
    desc: 'Confidential, structured incident response workflow',
    icon: '🕵️',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Complaint Received' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Lock Confidentiality', actionId: 'send_slack' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Initial Assessment', assignee: 'ER Specialist' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Proceed to Investigate?', approverRole: 'Head of HR' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Witness Interviews', assignee: 'External Investigator' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Draft Findings', assignee: 'Investigator' } },
      { id: 'a2', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Legal Counsel Review', approverRole: 'Legal' } },
      { id: 't4', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Disciplinary Action', assignee: 'HRBP' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Case Closed', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 'au1', animated: true },
      { id: 'e2', source: 'au1', target: 't1', animated: true },
      { id: 'e3', source: 't1', target: 'a1', animated: true },
      { id: 'e4', source: 'a1', target: 't2', animated: true },
      { id: 'e5', source: 't2', target: 't3', animated: true },
      { id: 'e6', source: 't3', target: 'a2', animated: true },
      { id: 'e7', source: 'a2', target: 't4', animated: true },
      { id: 'e8', source: 't4', target: 'e1', animated: true },
    ]
  },
  {
    id: 'workforce_planning',
    name: 'Strategic Workforce Planning',
    desc: 'Annual capacity and skills gap analysis cycle',
    icon: '🧭',
    nodes: [
      { id: 's1', type: 'start', position: { x: 0, y: 0 }, data: { type: 'start', title: 'Planning Kickoff' } },
      { id: 't1', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Analyze Business Goals', assignee: 'Exec Team' } },
      { id: 't2', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Skills Gap Assessment', assignee: 'HR Analytics' } },
      { id: 't3', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Attrition Forecasting', assignee: 'Data Science' } },
      { id: 'au1', type: 'automated', position: { x: 0, y: 0 }, data: { type: 'automated', title: 'Generate Scenarios', actionId: 'generate_doc' } },
      { id: 'a1', type: 'approval', position: { x: 0, y: 0 }, data: { type: 'approval', title: 'Headcount Budget', approverRole: 'CFO' } },
      { id: 't4', type: 'task', position: { x: 0, y: 0 }, data: { type: 'task', title: 'Finalize Hiring Plan', assignee: 'TA Director' } },
      { id: 'e1', type: 'end', position: { x: 0, y: 0 }, data: { type: 'end', title: 'Plan Finalized', isSummary: true } },
    ],
    edges: [
      { id: 'e1', source: 's1', target: 't1', animated: true },
      { id: 'e2', source: 't1', target: 't2', animated: true },
      { id: 'e3', source: 't1', target: 't3', animated: true },
      { id: 'e4', source: 't2', target: 'au1', animated: true },
      { id: 'e5', source: 't3', target: 'au1', animated: true },
      { id: 'e6', source: 'au1', target: 'a1', animated: true },
      { id: 'e7', source: 'a1', target: 't4', animated: true },
      { id: 'e8', source: 't4', target: 'e1', animated: true },
    ]
  }
];

let fileContent = fs.readFileSync('src/data/templates.ts', 'utf-8');
fileContent = fileContent.replace(/];\s*$/, '');

let output = '';
for (let i = 0; i < complexTemplates.length; i++) {
  const t = complexTemplates[i];
  output += `,
  {
    id: '${t.id}',
    name: '${t.name}',
    description: '${t.desc}',
    icon: '${t.icon}',
    nodes: ${JSON.stringify(t.nodes, null, 6)},
    edges: ${JSON.stringify(t.edges, null, 6)},
  }`;
}

output += '\n];\n';

fs.writeFileSync('src/data/templates.ts', fileContent + output);
console.log('Appended 10 complex templates.');
