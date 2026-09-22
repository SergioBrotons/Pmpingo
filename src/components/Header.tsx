'use client';

import React, { useState, useEffect } from 'react';
import { UserStats } from '@/types';
import { Download, Check, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  stats: UserStats;
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ stats, currentTab, onSelectTab }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('pmpingo_theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('pmpingo_theme', nextTheme);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install PMPingo on your smartphone:\n• iOS (Safari): Tap Share ➔ "Add to Home Screen"\n• Android (Chrome): Tap browser menu (⋮) ➔ "Install app"');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const navItems = [
    { id: 'today', label: 'Today' },
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'mistakes', label: 'Mistakes' },
    { id: 'progress', label: 'Progress' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <header className="swiss-header">
      <div className="swiss-container">
        <div className="header-inner">
          {/* Brand Mark */}
          <div className="brand-mark">
            <div className="brand-dot" aria-hidden="true" />
            <span className="brand-name">PMPingo</span>
            <span className="brand-sub">ECO 2026</span>
          </div>

          {/* Nav Items - Desktop only */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Metrics & Theme Controls */}
          <div className="header-metrics">
            <div className="metric-item">
              <span>Day</span>
              <span className="metric-val">{stats.diagnosticCompleted ? '1' : '0'}/28</span>
            </div>
            <div className="metric-item">
              <span>🔥</span>
              <span className="metric-val">{stats.streakDays}d</span>
            </div>

            {/* Dark / Clear Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn-swiss btn-swiss-secondary"
              style={{ padding: '6px 10px', fontSize: '0.78rem', minHeight: '34px', width: 'auto' }}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Clear (Light)'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              <span style={{ textTransform: 'capitalize' }}>{theme === 'light' ? 'Dark' : 'Clear'}</span>
            </button>

            {/* Install PWA App Button */}
            <button
              onClick={handleInstallClick}
              className="btn-swiss btn-swiss-secondary"
              style={{ padding: '6px 10px', fontSize: '0.78rem', minHeight: '34px', width: 'auto' }}
              title="Install progressive web app on smartphone"
            >
              {installed ? <Check size={14} /> : <Download size={14} />}
              <span>{installed ? 'Installed' : 'App'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
