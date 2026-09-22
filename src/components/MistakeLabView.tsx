'use client';

import React, { useMemo } from 'react';
import { getAnswerHistory, getSpacedRepetitionCards } from '@/lib/storage';
import { MistakeCategory } from '@/types';
import { RotateCcw, ArrowRight } from 'lucide-react';

interface MistakeLabViewProps {
  onPracticeWeakSpots: () => void;
}

const ALL_MISTAKES: MistakeCategory[] = [
  'MINDSET ERROR',
  'FIRST/NEXT ERROR',
  'AGILE/PREDICTIVE CONFUSION',
  'PREMATURE ESCALATION',
  'RISK/ISSUE CONFUSION',
  'STAKEHOLDER ERROR',
  'TEAM/LEADERSHIP ERROR',
  'CHANGE/BASELINE ERROR',
  'VALUE ERROR',
  'PROCESS BEFORE UNDERSTANDING',
  'KNOWLEDGE GAP',
  'QUESTION MISREAD',
  'OVERTHINKING',
  'ANSWER CHANGED',
  'TIME PRESSURE',
];

export const MistakeLabView: React.FC<MistakeLabViewProps> = ({ onPracticeWeakSpots }) => {
  const history = getAnswerHistory();
  const cards = getSpacedRepetitionCards();

  const mistakeFrequencies = useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach((record) => {
      if (!record.isCorrect && record.primaryMistake) {
        counts[record.primaryMistake] = (counts[record.primaryMistake] || 0) + 1;
      }
    });
    return counts;
  }, [history]);

  // Identify dangerous misconceptions (incorrect + high confidence level 3 or 4)
  const dangerousMisconceptions = useMemo(() => {
    return history.filter((h) => !h.isCorrect && h.confidence >= 3);
  }, [history]);

  // Identify fragile knowledge (correct + low confidence level 1 or 2)
  const fragileKnowledge = useMemo(() => {
    return history.filter((h) => h.isCorrect && h.confidence <= 2);
  }, [history]);

  const cardsDueCount = cards.filter((c) => c.nextReviewDate <= Date.now() || c.box === 1).length;

  return (
    <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <span className="label-meta">Diagnostic Analytics</span>
          <h1 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
            Error Taxonomy & Performance Review
          </h1>
          <p className="text-body-lead text-secondary" style={{ maxWidth: '680px' }}>
            Systematic classification of cognitive patterns to isolate recurring biases and calibrate exam decision sequences.
          </p>
        </div>

        <button
          onClick={onPracticeWeakSpots}
          className="btn-swiss btn-swiss-primary"
          style={{ padding: '12px 20px' }}
        >
          <span>Remediate Due Weak Spots ({cardsDueCount})</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid-12">
        {/* Left Column (8 cols): Mistake Frequency Matrix */}
        <div className="col-span-8">
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Taxonomy Distribution</span>
              <span className="label-meta" style={{ fontFeatureSettings: '"tnum"' }}>
                {history.filter((h) => !h.isCorrect).length} Recorded Errors
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {ALL_MISTAKES.map((category) => {
                const count = mistakeFrequencies[category] || 0;
                return (
                  <div
                    key={category}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3) 0',
                      borderBottom: '1px solid var(--border-hairline)',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', color: count > 0 ? 'var(--text-main)' : 'var(--text-secondary)', fontWeight: count > 0 ? 600 : 400 }}>
                      {category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontFeatureSettings: '"tnum"',
                          fontWeight: 700,
                          color: count > 0 ? 'var(--signal-swiss-red)' : 'var(--text-muted)',
                        }}
                      >
                        {count} occurrences
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Calibration Breakdown & Leitner Boxes */}
        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Dangerous Misconceptions vs Fragile Knowledge */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Confidence Calibration</span>
            </div>

            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--signal-swiss-red)' }}>Dangerous Misconceptions</span>
                <span style={{ fontWeight: 700, fontFeatureSettings: '"tnum"' }}>{dangerousMisconceptions.length}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Incorrect decisions submitted with high confidence (priority remediation target).
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--signal-amber)' }}>Fragile Knowledge</span>
                <span style={{ fontWeight: 700, fontFeatureSettings: '"tnum"' }}>{fragileKnowledge.length}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Correct answers submitted with low confidence (requires consolidation).
              </p>
            </div>
          </div>

          {/* Spaced Repetition Leitner Hierarchy */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Spaced Repetition Stages</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { box: 1, label: 'Stage 1 • Daily (1d)', count: cards.filter((c) => c.box === 1).length },
                { box: 2, label: 'Stage 2 • Early (2d)', count: cards.filter((c) => c.box === 2).length },
                { box: 3, label: 'Stage 3 • Developing (4d)', count: cards.filter((c) => c.box === 3).length },
                { box: 4, label: 'Stage 4 • Solid (7d)', count: cards.filter((c) => c.box === 4).length },
                { box: 5, label: 'Stage 5 • Mastered (14d)', count: cards.filter((c) => c.box === 5).length },
              ].map((stage) => (
                <div
                  key={stage.box}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-2) var(--space-3)',
                    backgroundColor: 'var(--bg-subtle)',
                    fontSize: '0.825rem',
                  }}
                >
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{stage.label}</span>
                  <span style={{ fontWeight: 700, fontFeatureSettings: '"tnum"' }}>{stage.count} items</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
