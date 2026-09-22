'use client';

import React from 'react';
import { Home, BookOpen, BrainCircuit, AlertTriangle, BarChart3 } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: BrainCircuit },
    { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
