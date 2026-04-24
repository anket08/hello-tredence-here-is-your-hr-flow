import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { validateWorkflow } from '../utils/validation';

export function useValidation() {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const errors = useMemo(
    () => validateWorkflow(activeTab.nodes, activeTab.edges),
    [activeTab.nodes, activeTab.edges]
  );

  const getNodeError = (nodeId: string): string | undefined => {
    const err = errors.find((e) => e.nodeId === nodeId);
    return err?.message;
  };

  return { errors, getNodeError };
}
