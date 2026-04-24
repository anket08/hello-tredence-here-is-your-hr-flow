import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Pencil, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TabBar: React.FC = () => {
  const tabs = useStore((s) => s.tabs);
  const activeTabId = useStore((s) => s.activeTabId);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const addTab = useStore((s) => s.addTab);
  const removeTab = useStore((s) => s.removeTab);
  const renameTab = useStore((s) => s.renameTab);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const startEditing = (id: string, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const commitRename = () => {
    if (editingId && editValue.trim()) {
      renameTab(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="flex items-center gap-1 px-4 py-1.5 border-b border-[#2a2218] bg-[#1a1410] overflow-x-auto shrink-0">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        const isEditing = editingId === tab.id;

        return (
          <div
            key={tab.id}
            onClick={() => !isEditing && setActiveTab(tab.id)}
            className={`
              group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all shrink-0
              ${isActive
                ? 'bg-white/10 shadow-sm border border-white/10 text-white/90'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }
            `}
          >
            {/* Active indicator dot */}
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#f06422] shrink-0"></div>}

            {/* Tab name or edit input */}
            {isEditing ? (
              <input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setEditingId(null); }}
                className="bg-transparent border-b border-[#f06422] outline-none text-xs font-semibold text-white/90 w-24 py-0"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="truncate max-w-[120px]">{tab.name}</span>
            )}

            {/* Edit / Confirm button */}
            {isActive && !isEditing && (
              <button
                onClick={(e) => { e.stopPropagation(); startEditing(tab.id, tab.name); }}
                className="p-0.5 text-white/40 hover:text-[#f06422] transition-colors opacity-0 group-hover:opacity-100"
              >
                <Pencil size={11} />
              </button>
            )}
            {isEditing && (
              <button
                onClick={(e) => { e.stopPropagation(); commitRename(); }}
                className="p-0.5 text-emerald-400 hover:text-emerald-500 transition-colors"
              >
                <Check size={12} />
              </button>
            )}

            {/* Close button */}
            {tabs.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}
                className="p-0.5 text-white/40 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={11} />
              </button>
            )}
          </div>
        );
      })}

      {/* Add tab button */}
      <button
        onClick={addTab}
        className="p-1.5 text-white/40 hover:text-[#f06422] hover:bg-white/5 rounded-lg transition-colors shrink-0 ml-1"
        title="New Workflow"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
