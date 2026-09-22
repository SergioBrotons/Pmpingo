'use client';

import React from 'react';
import { Home, BookOpen, BrainCircuit, Trophy, AlertTriangle } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'practice', label: 'Practice', icon: BrainCircuit },
    { id: 'leaderboard', label: 'Ranking', icon: Trophy },
    { id: 'learn', label: '28 Days', icon: BookOpen },
    { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle },
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
            <Icon size={19} strokeWidth={isActive ? 2.2 : 1.7} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
