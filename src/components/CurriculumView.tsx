'use client';

import React, { useState } from 'react';
import { CURRICULUM_DAYS } from '@/data/curriculum';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface CurriculumViewProps {
  onStartDay: (dayNumber: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onStartDay }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  return (
    <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
      {/* Header section */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <span className="label-meta">Curriculum Architecture</span>
        <h1 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
          28-Day Study Programme
        </h1>
        <p className="text-body-lead text-secondary" style={{ maxWidth: '750px' }}>
          Mapped to the official PMP Exam Content Outline across People (42%), Process (50%), and Business Environment (8%).
        </p>
      </div>

      {/* Days List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {CURRICULUM_DAYS.map((item) => {
          const isExpanded = expandedDay === item.day;
          return (
            <div key={item.day} className="panel" style={{ padding: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-4) var(--space-6)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => setExpandedDay(isExpanded ? null : item.day)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div
                    style={{
                      fontFeatureSettings: '"tnum"',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      minWidth: '50px',
                    }}
                  >
                    Day {item.day.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {item.domain} • {item.deliveryFocus} • {item.ecoTask}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartDay(item.day);
                    }}
                    className="btn-swiss btn-swiss-secondary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <span>Practice Day {item.day}</span>
                    <ArrowRight size={14} />
                  </button>
                  {isExpanded ? <ChevronUp size={18} color="#7A7A78" /> : <ChevronDown size={18} color="#7A7A78" />}
                </div>
              </div>

              {isExpanded && (
                <div
                  style={{
                    padding: 'var(--space-6)',
                    borderTop: '1px solid var(--border-hairline)',
                    backgroundColor: 'var(--bg-subtle)',
                  }}
                >
                  <div className="grid-12">
                    <div className="col-span-6">
                      <div className="label-meta" style={{ marginBottom: 'var(--space-1)' }}>Concept & Purpose</div>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)', marginBottom: 'var(--space-4)' }}>
                        {item.microLesson.summary}
                      </p>

                      <div className="label-meta" style={{ marginBottom: 'var(--space-1)' }}>Why It Matters On Exam</div>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {item.microLesson.whyItMatters}
                      </p>
                    </div>

                    <div className="col-span-6" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-hairline)' }}>
                        <span className="label-meta" style={{ color: 'var(--signal-blue)' }}>Predictive Application</span>
                        <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-main)' }}>
                          {item.microLesson.predictiveTake}
                        </p>
                      </div>

                      <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-hairline)' }}>
                        <span className="label-meta" style={{ color: 'var(--signal-green)' }}>Adaptive / Agile Application</span>
                        <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-main)' }}>
                          {item.microLesson.agileTake}
                        </p>
                      </div>

                      <div style={{ padding: 'var(--space-3)', backgroundColor: 'rgba(218, 41, 28, 0.04)', border: '1px solid rgba(218, 41, 28, 0.2)' }}>
                        <span className="label-meta" style={{ color: 'var(--signal-swiss-red)' }}>Exam Trap</span>
                        <p style={{ fontSize: '0.85rem', marginTop: '4px', color: 'var(--text-main)' }}>
                          {item.microLesson.pmpTrap}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
