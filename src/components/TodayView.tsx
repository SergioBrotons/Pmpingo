'use client';

import React from 'react';
import { UserStats, SpacedRepetitionCard } from '@/types';
import { ArrowRight, CheckCircle2, AlertCircle, Calendar, Zap, BookOpen } from 'lucide-react';

interface TodayViewProps {
  stats: UserStats;
  spacedCards: SpacedRepetitionCard[];
  onStartToday: () => void;
  onStartDiagnostic: () => void;
  onOpenLearn: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  stats,
  spacedCards,
  onStartToday,
  onStartDiagnostic,
  onOpenLearn,
}) => {
  const dueReviewsCount = spacedCards.filter((c) => c.nextReviewDate <= Date.now() || c.box === 1).length;
  const currentDay = stats.diagnosticCompleted ? 1 : 0;

  return (
    <div className="grid-12" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
      {/* Primary Mission Column (8 columns) */}
      <div className="col-span-8">
        <div className="panel" style={{ padding: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <span className="label-meta">Mission Control</span>
            <span style={{ color: 'var(--border-hairline)' }}>•</span>
            <span className="label-meta" style={{ color: 'var(--signal-swiss-red)' }}>
              Day {currentDay} of 28
            </span>
          </div>

          <h1 style={{ marginBottom: 'var(--space-4)' }}>
            {stats.diagnosticCompleted
              ? 'Exam Architecture & Servant Leadership'
              : 'Initial Baseline Diagnostic'}
          </h1>

          <p className="text-body-lead text-secondary" style={{ marginBottom: 'var(--space-8)', maxWidth: '680px' }}>
            {stats.diagnosticCompleted
              ? 'Focus today is on calibrating situational leadership judgement, understanding agile vs predictive delivery boundaries, and establishing core ECO reasoning sequences.'
              : 'A 5-question calibration covering People, Process, and Business Environment to map your baseline readiness and calibrate Day 1 study priorities.'}
          </p>

          {/* Session Overview Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              padding: 'var(--space-4) 0',
              borderTop: '1px solid var(--border-hairline)',
              borderBottom: '1px solid var(--border-hairline)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div>
              <span className="label-meta">Format</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
                Active Loop (30 min)
              </div>
            </div>
            <div>
              <span className="label-meta">ECO Focus</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
                Task 1.2: Lead a Team
              </div>
            </div>
            <div>
              <span className="label-meta">Approach</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>
                Hybrid & Adaptive
              </div>
            </div>
          </div>

          {/* Strong Primary Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <button
              onClick={stats.diagnosticCompleted ? onStartToday : onStartDiagnostic}
              className="btn-swiss btn-swiss-primary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <span>{stats.diagnosticCompleted ? 'Start Today’s Session' : 'Begin Diagnostic Assessment'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenLearn}
              className="btn-swiss btn-swiss-secondary"
              style={{ padding: '14px 20px', fontSize: '0.95rem' }}
            >
              <BookOpen size={16} />
              <span>Review 28-Day Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Structured Status Column (4 columns) */}
      <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Status Snapshot Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="label-meta">Plan Status</span>
            <span className="tag">{stats.diagnosticCompleted ? 'Active' : 'Uncalibrated'}</span>
          </div>

          <div className="meter-row">
            <div className="meter-header">
              <span>28-Day Completion</span>
              <span>{Math.round((currentDay / 28) * 100)}%</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${Math.max(4, (currentDay / 28) * 100)}%` }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-subtle)' }}>
              <span className="label-meta">Questions</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px', fontFeatureSettings: '"tnum"' }}>
                {stats.questionsAttempted}
              </div>
            </div>
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-subtle)' }}>
              <span className="label-meta">Accuracy</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px', fontFeatureSettings: '"tnum"' }}>
                {stats.questionsAttempted > 0
                  ? `${Math.round((stats.questionsCorrect / stats.questionsAttempted) * 100)}%`
                  : '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Spaced Reviews Due Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="label-meta">Retrieval Practice</span>
            <span className="label-meta" style={{ color: dueReviewsCount > 0 ? 'var(--signal-amber)' : 'var(--signal-green)' }}>
              {dueReviewsCount} Due
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            {dueReviewsCount > 0
              ? `${dueReviewsCount} previously missed concepts require active retrieval today to prevent forgetting.`
              : 'All spaced repetition items are up to date. You are prepared for new scenarios.'}
          </p>

          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-3)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Next review cycle triggers at midnight UTC.
          </div>
        </div>
      </div>
    </div>
  );
};
