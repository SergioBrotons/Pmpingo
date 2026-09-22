'use client';

import React, { useState } from 'react';
import { MistakeCategory } from '@/types';
import { UploadCloud, CheckCircle2, ShieldAlert, BookCheck } from 'lucide-react';

interface StudyHallViewProps {
  onLoggedResult: (category: MistakeCategory) => void;
}

export const StudyHallView: React.FC<StudyHallViewProps> = ({ onLoggedResult }) => {
  const [topic, setTopic] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [selectedMistake, setSelectedMistake] = useState<MistakeCategory>('MINDSET ERROR');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !takeaway) return;
    onLoggedResult(selectedMistake);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTopic('');
      setMyAnswer('');
      setCorrectAnswer('');
      setTakeaway('');
    }, 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
          Study Hall Calibration Lab
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Deconstruct external PMI Study Hall questions to isolate the underlying concept and calibrate mastery.
        </p>
      </div>

      <div className="card">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Study Hall Insight Logged!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your mistake profile and spaced repetition queue have been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Topic / Concept Tested:
              </label>
              <input
                type="text"
                placeholder="e.g. Stakeholder conflict regarding sprint scope adjustment"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Your Selected Answer:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Escalate to CCB"
                  value={myAnswer}
                  onChange={(e) => setMyAnswer(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  PMI Correct Answer:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coach PO and facilitate alignment"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Primary Mistake Category:
              </label>
              <select
                value={selectedMistake}
                onChange={(e) => setSelectedMistake(e.target.value as MistakeCategory)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.9rem',
                }}
              >
                <option value="MINDSET ERROR">MINDSET ERROR (Valid action, but poor PM judgement)</option>
                <option value="FIRST/NEXT ERROR">FIRST/NEXT ERROR (Right action, wrong sequence)</option>
                <option value="AGILE/PREDICTIVE CONFUSION">AGILE/PREDICTIVE CONFUSION (Applied wrong delivery approach)</option>
                <option value="PREMATURE ESCALATION">PREMATURE ESCALATION (Escalated before investigating or collaborating)</option>
                <option value="RISK/ISSUE CONFUSION">RISK/ISSUE CONFUSION (Confused potential risk with active issue)</option>
                <option value="KNOWLEDGE GAP">KNOWLEDGE GAP (Did not know specific formula or tool)</option>
                <option value="CHANGE/BASELINE ERROR">CHANGE/BASELINE ERROR (Mishandled change control)</option>
                <option value="QUESTION MISREAD">QUESTION MISREAD (Missed FIRST/NEXT/NOT)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                Key PMP Reasoning Distinction (Why PMI preferred the correct choice):
              </label>
              <textarea
                rows={3}
                placeholder="e.g. In Agile, the PM does not dictate scope; the PM empowers the Product Owner to evaluate backlog value."
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                required
              />
            </div>

            <button type="submit" className="btn-tactile btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <BookCheck size={18} />
              <span>Log Insight & Update Calibration</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
