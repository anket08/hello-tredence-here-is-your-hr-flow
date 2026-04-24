import React from 'react';
import { CheckCircle2, AlertTriangle, Circle } from 'lucide-react';
import { useValidation } from '../../hooks/useValidation';
import { useStore } from '../../store/useStore';

export const StatusBar: React.FC = () => {
  const { errors } = useValidation();
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const errorCount = errors.filter((e) => e.severity === 'error').length;
  const warningCount = errors.filter((e) => e.severity === 'warning').length;
  const isValid = errorCount === 0;

  return (
    <div className="h-7 glass-strong border-t border-slate-200/40 flex items-center justify-between px-5 text-[11px] font-medium text-slate-500 z-30 shrink-0">
      <div className="flex items-center gap-4">
        {/* Validation status */}
        <div className="flex items-center gap-1.5">
          {isValid ? (
            <>
              <CheckCircle2 size={12} className="text-emerald-500" />
              <span className="text-emerald-600">Valid workflow</span>
            </>
          ) : (
            <>
              <AlertTriangle size={12} className="text-rose-500" />
              <span className="text-rose-600">{errorCount} error{errorCount !== 1 ? 's' : ''}</span>
            </>
          )}
        </div>

        {warningCount > 0 && (
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-amber-500" />
            <span className="text-amber-600">{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Circle size={8} className="text-blue-400 fill-blue-400" />
          <span>{activeTab.nodes.length} nodes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle size={8} className="text-slate-400 fill-slate-400" />
          <span>{activeTab.edges.length} edges</span>
        </div>
      </div>
    </div>
  );
};
