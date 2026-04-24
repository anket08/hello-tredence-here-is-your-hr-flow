import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { validateWorkflow } from '../utils/validation';
import type { ValidationError } from '../utils/validation';

export interface EnrichedError extends ValidationError {
  nodeTitle: string;
}

export function useValidation() {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const errors = useMemo(() => {
    const raw = validateWorkflow(activeTab.nodes, activeTab.edges);
    return raw.map((err): EnrichedError => {
      const node = activeTab.nodes.find((n) => n.id === err.nodeId);
      return { ...err, nodeTitle: node?.data?.title || err.nodeId || 'Workflow' };
    });
  }, [activeTab.nodes, activeTab.edges]);

  const getNodeError = (nodeId: string): string | undefined => {
    const err = errors.find((e) => e.nodeId === nodeId);
    return err?.message;
  };

  return { errors, getNodeError };
}
