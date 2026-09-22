'use client';

import React, { useState } from 'react';
import { UserStats, MistakeCategory } from '@/types';
import { BookCheck, CheckCircle2 } from 'lucide-react';

interface ProgressViewProps {
  stats: UserStats;
  onLogStudyHall: (category: MistakeCategory) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ stats, onLogStudyHall }) => {
  const [shTopic, setShTopic] = useState('');
  const [shMistake, setShMistake] = useState<MistakeCategory>('MINDSET ERROR');
  const [shReasoning, setShReasoning] = useState('');
  const [shLogged, setShLogged] = useState(false);

  const handleStudyHallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shTopic || !shReasoning) return;
    onLogStudyHall(shMistake);
    setShLogged(true);
    setTimeout(() => {
      setShLogged(false);
      setShTopic('');
      setShReasoning('');
    }, 2500);
  };

  const getDomainTone = (val: number) => {
    if (val >= 75) return 'green';
    if (val >= 50) return 'blue';
    return 'amber';
  };

  return (
    <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <span className="label-meta">Analytical Overview</span>
        <h1 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
          Mastery & Examination Readiness
        </h1>
        <p className="text-body-lead text-secondary" style={{ maxWidth: '680px' }}>
          Quantitative calibration across official ECO examination domains, delivery models, and external Study Hall benchmarks.
        </p>
      </div>

      <div className="grid-12">
        {/* Left Column (7 cols): Domain & Approach Mastery */}
        <div className="col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* ECO Domains Breakdown */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">ECO Domain Performance</span>
              <span className="label-meta">Exam Weight</span>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>People Domain</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.domainMastery.People}% (42% weight)</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.domainMastery.People)}`}
                  style={{ width: `${stats.domainMastery.People}%` }}
                />
              </div>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>Process Domain</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.domainMastery.Process}% (50% weight)</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.domainMastery.Process)}`}
                  style={{ width: `${stats.domainMastery.Process}%` }}
                />
              </div>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>Business Environment</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.domainMastery['Business Environment']}% (8% weight)</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.domainMastery['Business Environment'])}`}
                  style={{ width: `${stats.domainMastery['Business Environment']}%` }}
                />
              </div>
            </div>
          </div>

          {/* Delivery Approaches Breakdown */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Delivery Model Calibration</span>
              <span className="label-meta">Exam Balance</span>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>Predictive Waterfall</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.approachMastery.Predictive}%</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.approachMastery.Predictive)}`}
                  style={{ width: `${stats.approachMastery.Predictive}%` }}
                />
              </div>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>Agile / Adaptive</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.approachMastery.Agile}%</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.approachMastery.Agile)}`}
                  style={{ width: `${stats.approachMastery.Agile}%` }}
                />
              </div>
            </div>

            <div className="meter-row">
              <div className="meter-header">
                <span>Hybrid Integration</span>
                <span style={{ fontFeatureSettings: '"tnum"' }}>{stats.approachMastery.Hybrid}%</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-fill ${getDomainTone(stats.approachMastery.Hybrid)}`}
                  style={{ width: `${stats.approachMastery.Hybrid}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Study Hall Benchmark & Session History */}
        <div className="col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* External Study Hall Benchmark Tool */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">PMI Study Hall Input</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Log questions from official PMI Study Hall practice exams to calibrate your cognitive error patterns without reproducing proprietary text.
            </p>

            {shLogged ? (
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--signal-green)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--signal-green)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Benchmark Logged</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Inferred mastery updated. Spaced repetition priority adjusted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStudyHallSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <label className="label-meta" style={{ display: 'block', marginBottom: '4px' }}>
                    Concept / Topic Tested
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stakeholder conflict in hybrid sprint review"
                    value={shTopic}
                    onChange={(e) => setShTopic(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-surface)',
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="label-meta" style={{ display: 'block', marginBottom: '4px' }}>
                    Diagnosed Error Category
                  </label>
                  <select
                    value={shMistake}
                    onChange={(e) => setShMistake(e.target.value as MistakeCategory)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-surface)',
                    }}
                  >
                    <option value="MINDSET ERROR">MINDSET ERROR</option>
                    <option value="FIRST/NEXT ERROR">FIRST/NEXT ERROR</option>
                    <option value="AGILE/PREDICTIVE CONFUSION">AGILE/PREDICTIVE CONFUSION</option>
                    <option value="PREMATURE ESCALATION">PREMATURE ESCALATION</option>
                    <option value="RISK/ISSUE CONFUSION">RISK/ISSUE CONFUSION</option>
                    <option value="KNOWLEDGE GAP">KNOWLEDGE GAP</option>
                    <option value="QUESTION MISREAD">QUESTION MISREAD</option>
                  </select>
                </div>

                <div>
                  <label className="label-meta" style={{ display: 'block', marginBottom: '4px' }}>
                    Key Reasoning Distinction
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Why PMI preferred the correct choice over your choice..."
                    value={shReasoning}
                    onChange={(e) => setShReasoning(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-surface)',
                      fontFamily: 'inherit',
                    }}
                    required
                  />
                </div>

                <button type="submit" className="btn-swiss btn-swiss-primary" style={{ padding: '8px 16px', fontSize: '0.825rem' }}>
                  <BookCheck size={14} />
                  <span>Calibrate From Result</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
