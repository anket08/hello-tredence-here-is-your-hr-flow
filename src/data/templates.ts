import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

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
    id: "onboarding",
    name: "Employee Onboarding",
    description: "Standard new hire onboarding workflow",
    icon: "👋",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "leave",
    name: "Leave Approval",
    description: "Employee leave request and approval flow",
    icon: "✈️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "offboarding",
    name: "Employee Offboarding",
    description: "Standard exit and offboarding workflow",
    icon: "📦",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "performance",
    name: "Performance Review",
    description: "Quarterly performance evaluation cycle",
    icon: "📊",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "expense",
    name: "Expense Reimbursement",
    description: "Submit and approve expense claims",
    icon: "💰",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "promotion",
    name: "Employee Promotion",
    description: "Process for reviewing and approving promotions",
    icon: "🚀",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "travel",
    name: "Business Travel Request",
    description: "Workflow for booking and approving business trips",
    icon: "🚆",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "incident",
    name: "Workplace Incident Report",
    description: "Report and investigate workplace incidents",
    icon: "⚠️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "training",
    name: "Training Enrollment",
    description: "Request and approve employee training programs",
    icon: "📚",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "hardware",
    name: "Hardware Request",
    description: "Request new IT hardware or replacements",
    icon: "💻",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "software",
    name: "Software License",
    description: "Request access to new software tools",
    icon: "🔑",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "relocation",
    name: "Employee Relocation",
    description: "Manage logistics for employee relocation",
    icon: "🌍",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "maternity",
    name: "Maternity/Paternity Leave",
    description: "Process extended parental leave requests",
    icon: "👶",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "grievance",
    name: "Grievance Resolution",
    description: "Formal process for employee grievances",
    icon: "⚖️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "referral",
    name: "Employee Referral",
    description: "Submit and track candidate referrals",
    icon: "🤝",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "bonus",
    name: "Bonus Distribution",
    description: "Calculate and approve annual bonuses",
    icon: "💵",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "probation",
    name: "Probation Review",
    description: "End of probation assessment and confirmation",
    icon: "✅",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "contract",
    name: "Contract Renewal",
    description: "Review and renew employee contracts",
    icon: "📄",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "salary",
    name: "Salary Advance Request",
    description: "Process early salary advance requests",
    icon: "🏦",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "wfh",
    name: "Work From Home Request",
    description: "Apply for permanent or temporary WFH",
    icon: "🏠",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "survey",
    name: "Employee Engagement Survey",
    description: "Conduct and analyze engagement surveys",
    icon: "📝",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "appraisal",
    name: "Annual Appraisal",
    description: "Year-end comprehensive performance appraisal",
    icon: "🎯",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "transfer",
    name: "Internal Department Transfer",
    description: "Move an employee between departments",
    icon: "🔄",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "awards",
    name: "Employee Recognition",
    description: "Nominate and approve employee awards",
    icon: "🏆",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "benefits",
    name: "Benefits Enrollment",
    description: "Annual health and benefits enrollment",
    icon: "🏥",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "visa",
    name: "Visa Processing",
    description: "Manage work visa applications and renewals",
    icon: "🛂",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "policy",
    name: "Policy Acknowledgement",
    description: "Ensure employees read new company policies",
    icon: "📜",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "audit",
    name: "HR Compliance Audit",
    description: "Regular auditing of HR processes and data",
    icon: "🔍",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "budget",
    name: "HR Budget Approval",
    description: "Annual HR department budget planning",
    icon: "📈",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "feedback",
    name: "360 Degree Feedback",
    description: "Collect peer and manager feedback",
    icon: "💬",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: { x: 300, y: 40 },
        data: { type: "start", title: "Start Workflow" },
      },
      {
        id: "t1",
        type: "task",
        position: { x: 300, y: 160 },
        data: { type: "task", title: "Submit Request", assignee: "Employee" },
      },
      {
        id: "a1",
        type: "approval",
        position: { x: 300, y: 300 },
        data: { type: "approval", title: "Review", approverRole: "Manager" },
      },
      {
        id: "au1",
        type: "automated",
        position: { x: 300, y: 440 },
        data: { type: "automated", title: "Notify HR", actionId: "send_email" },
      },
      {
        id: "e1",
        type: "end",
        position: { x: 300, y: 580 },
        data: { type: "end", title: "Workflow Complete", isSummary: true },
      },
    ],
    edges: [
      { id: "e-s1-t1", source: "s1", target: "t1", animated: true },
      { id: "e-t1-a1", source: "t1", target: "a1", animated: true },
      { id: "e-a1-au1", source: "a1", target: "au1", animated: true },
      { id: "e-au1-e1", source: "au1", target: "e1", animated: true },
    ],
  },
  {
    id: "merger_acquisition",
    name: "M&A HR Integration",
    description: "Complex workflow for integrating employees during M&A",
    icon: "🏢",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "M&A Deal Closed",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Data Audit",
          assignee: "HR Data Analyst",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Benefits Mapping",
          assignee: "Comp & Ben",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Role Harmonization",
          assignee: "HRBP",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Exec Review",
          approverRole: "VP HR",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Generate Contracts",
          actionId: "generate_doc",
        },
      },
      {
        id: "t4",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Townhall Meeting",
          assignee: "Leadership",
        },
      },
      {
        id: "au2",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Send Welcome Kits",
          actionId: "send_email",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Integration Complete",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "t2",
        animated: true,
      },
      {
        id: "e3",
        source: "t1",
        target: "t3",
        animated: true,
      },
      {
        id: "e4",
        source: "t2",
        target: "a1",
        animated: true,
      },
      {
        id: "e5",
        source: "t3",
        target: "a1",
        animated: true,
      },
      {
        id: "e6",
        source: "a1",
        target: "au1",
        animated: true,
      },
      {
        id: "e7",
        source: "au1",
        target: "t4",
        animated: true,
      },
      {
        id: "e8",
        source: "t4",
        target: "au2",
        animated: true,
      },
      {
        id: "e9",
        source: "au2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "global_relocation",
    name: "Global Executive Relocation",
    description: "Multi-stage approval and logistics for international moves",
    icon: "✈️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Relocation Initiated",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Budget Approval",
          approverRole: "Finance Director",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Visa Processing",
          assignee: "Immigration Specialist",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Housing Search",
          assignee: "Relocation Agent",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "School Search",
          assignee: "Relocation Agent",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Book Flights",
          actionId: "generate_doc",
        },
      },
      {
        id: "a2",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Final Review",
          approverRole: "HRBP",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Relocation Complete",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "a1",
        animated: true,
      },
      {
        id: "e2",
        source: "a1",
        target: "t1",
        animated: true,
      },
      {
        id: "e3",
        source: "t1",
        target: "t2",
        animated: true,
      },
      {
        id: "e4",
        source: "t1",
        target: "t3",
        animated: true,
      },
      {
        id: "e5",
        source: "t2",
        target: "au1",
        animated: true,
      },
      {
        id: "e6",
        source: "t3",
        target: "au1",
        animated: true,
      },
      {
        id: "e7",
        source: "au1",
        target: "a2",
        animated: true,
      },
      {
        id: "e8",
        source: "a2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "org_restructure",
    name: "Department Restructuring",
    description: "Managing team moves, title changes, and system updates",
    icon: "🔀",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Restructure Plan Approved",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Update Org Chart",
          assignee: "HR Ops",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Notify IT Systems",
          actionId: "send_slack",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "1-on-1 Comms",
          assignee: "Managers",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Review Comms",
          approverRole: "Legal",
        },
      },
      {
        id: "au2",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Update Payroll",
          actionId: "generate_doc",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Restructure Executed",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "au1",
        animated: true,
      },
      {
        id: "e3",
        source: "au1",
        target: "t2",
        animated: true,
      },
      {
        id: "e4",
        source: "t2",
        target: "a1",
        animated: true,
      },
      {
        id: "e5",
        source: "a1",
        target: "au2",
        animated: true,
      },
      {
        id: "e6",
        source: "au2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "annual_comp",
    name: "Annual Compensation Cycle",
    description: "Complex multi-level approval for merit increases and bonuses",
    icon: "💹",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Cycle Kickoff",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Generate Worksheets",
          actionId: "generate_doc",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Manager Input",
          assignee: "All Managers",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Director Review",
          approverRole: "Director",
        },
      },
      {
        id: "a2",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Finance Calibration",
          approverRole: "Finance",
        },
      },
      {
        id: "a3",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Exec Signoff",
          approverRole: "CEO",
        },
      },
      {
        id: "au2",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Send Comp Letters",
          actionId: "send_email",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Employee Meetings",
          assignee: "Managers",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Cycle Closed",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "au1",
        animated: true,
      },
      {
        id: "e2",
        source: "au1",
        target: "t1",
        animated: true,
      },
      {
        id: "e3",
        source: "t1",
        target: "a1",
        animated: true,
      },
      {
        id: "e4",
        source: "a1",
        target: "a2",
        animated: true,
      },
      {
        id: "e5",
        source: "a2",
        target: "a3",
        animated: true,
      },
      {
        id: "e6",
        source: "a3",
        target: "au2",
        animated: true,
      },
      {
        id: "e7",
        source: "au2",
        target: "t2",
        animated: true,
      },
      {
        id: "e8",
        source: "t2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "rto_planning",
    name: "Return to Office Phasing",
    description: "Logistics and tracking for phased office returns",
    icon: "🏢",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Phase Declared",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Facility Audit",
          assignee: "Facilities",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Seating Plan",
          assignee: "HR Ops",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Send Surveys",
          actionId: "send_email",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Exceptions Review",
          approverRole: "HRBP",
        },
      },
      {
        id: "au2",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Activate Access Badges",
          actionId: "generate_doc",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Phase Complete",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "t2",
        animated: true,
      },
      {
        id: "e3",
        source: "t2",
        target: "au1",
        animated: true,
      },
      {
        id: "e4",
        source: "au1",
        target: "a1",
        animated: true,
      },
      {
        id: "e5",
        source: "a1",
        target: "au2",
        animated: true,
      },
      {
        id: "e6",
        source: "au2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "layoff_process",
    name: "Reduction in Force (RIF)",
    description: "Highly sensitive, legal-heavy offboarding workflow",
    icon: "⚖️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "RIF Approved",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Impact Analysis",
          assignee: "HR Analyst",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Legal Review",
          approverRole: "Legal Counsel",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Generate Severance Docs",
          actionId: "generate_doc",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Notification Meetings",
          assignee: "HRBP",
        },
      },
      {
        id: "au2",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Revoke Access",
          actionId: "send_slack",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Outplacement Support",
          assignee: "External Vendor",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Process Complete",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "a1",
        animated: true,
      },
      {
        id: "e3",
        source: "a1",
        target: "au1",
        animated: true,
      },
      {
        id: "e4",
        source: "au1",
        target: "t2",
        animated: true,
      },
      {
        id: "e5",
        source: "t2",
        target: "au2",
        animated: true,
      },
      {
        id: "e6",
        source: "au2",
        target: "t3",
        animated: true,
      },
      {
        id: "e7",
        source: "t3",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "compliance_audit",
    name: "SOC2 / ISO HR Compliance Audit",
    description: "Evidence gathering and approvals for formal audits",
    icon: "🔐",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Audit Triggered",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Alert Data Owners",
          actionId: "send_slack",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Gather Training Logs",
          assignee: "L&D",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Gather Offboarding Logs",
          assignee: "HR Ops",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Internal Review",
          approverRole: "Compliance Officer",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Submit to Auditors",
          assignee: "Compliance Officer",
        },
      },
      {
        id: "a2",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Remediation Signoff",
          approverRole: "CTO",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Audit Passed",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "au1",
        animated: true,
      },
      {
        id: "e2",
        source: "au1",
        target: "t1",
        animated: true,
      },
      {
        id: "e3",
        source: "au1",
        target: "t2",
        animated: true,
      },
      {
        id: "e4",
        source: "t1",
        target: "a1",
        animated: true,
      },
      {
        id: "e5",
        source: "t2",
        target: "a1",
        animated: true,
      },
      {
        id: "e6",
        source: "a1",
        target: "t3",
        animated: true,
      },
      {
        id: "e7",
        source: "t3",
        target: "a2",
        animated: true,
      },
      {
        id: "e8",
        source: "a2",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "leadership_hiring",
    name: "Executive Leadership Hiring",
    description: "High-touch recruitment flow for VP+ roles",
    icon: "👔",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Req Opened",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Search Firm Briefing",
          assignee: "Head of TA",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Candidate Shortlist",
          approverRole: "CEO",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Board Interviews",
          assignee: "Board Members",
        },
      },
      {
        id: "a2",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Final Selection",
          approverRole: "CEO",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Offer Negotiation",
          assignee: "External Counsel",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Initiate Background Check",
          actionId: "generate_doc",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Executive Hired",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "a1",
        animated: true,
      },
      {
        id: "e3",
        source: "a1",
        target: "t2",
        animated: true,
      },
      {
        id: "e4",
        source: "t2",
        target: "a2",
        animated: true,
      },
      {
        id: "e5",
        source: "a2",
        target: "t3",
        animated: true,
      },
      {
        id: "e6",
        source: "t3",
        target: "au1",
        animated: true,
      },
      {
        id: "e7",
        source: "au1",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "harassment_investigation",
    name: "Workplace Harassment Investigation",
    description: "Confidential, structured incident response workflow",
    icon: "🕵️",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Complaint Received",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Lock Confidentiality",
          actionId: "send_slack",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Initial Assessment",
          assignee: "ER Specialist",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Proceed to Investigate?",
          approverRole: "Head of HR",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Witness Interviews",
          assignee: "External Investigator",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Draft Findings",
          assignee: "Investigator",
        },
      },
      {
        id: "a2",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Legal Counsel Review",
          approverRole: "Legal",
        },
      },
      {
        id: "t4",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Disciplinary Action",
          assignee: "HRBP",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Case Closed",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "au1",
        animated: true,
      },
      {
        id: "e2",
        source: "au1",
        target: "t1",
        animated: true,
      },
      {
        id: "e3",
        source: "t1",
        target: "a1",
        animated: true,
      },
      {
        id: "e4",
        source: "a1",
        target: "t2",
        animated: true,
      },
      {
        id: "e5",
        source: "t2",
        target: "t3",
        animated: true,
      },
      {
        id: "e6",
        source: "t3",
        target: "a2",
        animated: true,
      },
      {
        id: "e7",
        source: "a2",
        target: "t4",
        animated: true,
      },
      {
        id: "e8",
        source: "t4",
        target: "e1",
        animated: true,
      },
    ],
  },
  {
    id: "workforce_planning",
    name: "Strategic Workforce Planning",
    description: "Annual capacity and skills gap analysis cycle",
    icon: "🧭",
    nodes: [
      {
        id: "s1",
        type: "start",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "start",
          title: "Planning Kickoff",
        },
      },
      {
        id: "t1",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Analyze Business Goals",
          assignee: "Exec Team",
        },
      },
      {
        id: "t2",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Skills Gap Assessment",
          assignee: "HR Analytics",
        },
      },
      {
        id: "t3",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Attrition Forecasting",
          assignee: "Data Science",
        },
      },
      {
        id: "au1",
        type: "automated",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "automated",
          title: "Generate Scenarios",
          actionId: "generate_doc",
        },
      },
      {
        id: "a1",
        type: "approval",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "approval",
          title: "Headcount Budget",
          approverRole: "CFO",
        },
      },
      {
        id: "t4",
        type: "task",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "task",
          title: "Finalize Hiring Plan",
          assignee: "TA Director",
        },
      },
      {
        id: "e1",
        type: "end",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          type: "end",
          title: "Plan Finalized",
          isSummary: true,
        },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "s1",
        target: "t1",
        animated: true,
      },
      {
        id: "e2",
        source: "t1",
        target: "t2",
        animated: true,
      },
      {
        id: "e3",
        source: "t1",
        target: "t3",
        animated: true,
      },
      {
        id: "e4",
        source: "t2",
        target: "au1",
        animated: true,
      },
      {
        id: "e5",
        source: "t3",
        target: "au1",
        animated: true,
      },
      {
        id: "e6",
        source: "au1",
        target: "a1",
        animated: true,
      },
      {
        id: "e7",
        source: "a1",
        target: "t4",
        animated: true,
      },
      {
        id: "e8",
        source: "t4",
        target: "e1",
        animated: true,
      },
    ],
  },
];
