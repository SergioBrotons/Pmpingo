'use client';

import React from 'react';
import { Question, ConfidenceLevel } from '@/types';
import { ArrowRight } from 'lucide-react';

interface DebriefModalProps {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
  confidence: ConfidenceLevel;
  onNext: () => void;
  earnedXP: number;
}

export const DebriefModal: React.FC<DebriefModalProps> = ({
  question,
  selectedAnswer,
  isCorrect,
  confidence,
  onNext,
  earnedXP,
}) => {
  return (
    <div className="debrief-panel panel">
      {/* Debrief Header */}
      <div className="debrief-status-row">
        <div>
          <span className="label-meta" style={{ display: 'block', marginBottom: '4px' }}>
            Decision Evaluation
          </span>
          <h3 className={`debrief-status-heading ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct Decision' : 'Suboptimal Decision Sequence'}
          </h3>
        </div>
        {earnedXP > 0 && (
          <span className="label-meta" style={{ color: 'var(--signal-blue)', fontWeight: 700 }}>
            +{earnedXP} XP
          </span>
        )}
      </div>

      {/* Decision Summary */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', margin: 'var(--space-4) 0', flexWrap: 'wrap' }}>
        <div className="tag">
          Selected: Option {selectedAnswer}
        </div>
        <div className={`tag ${isCorrect ? 'tag-people' : 'tag-business'}`}>
          Best: Option {question.correctAnswer}
        </div>
        {!isCorrect && (
          <div className="tag" style={{ color: 'var(--signal-swiss-red)', borderColor: 'rgba(218, 41, 28, 0.3)' }}>
            Cognitive Trap: {question.diagnosedMistake}
          </div>
        )}
      </div>

      {/* Best Answer Reasoning */}
      <div style={{ margin: 'var(--space-6) 0' }}>
        <div className="label-meta" style={{ marginBottom: 'var(--space-2)' }}>
          Reasoning & PMI Standard
        </div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
          {question.bestAnswerReasoning}
        </p>
      </div>

      {/* Reusable Decision Rule */}
      <div className="decision-rule-quote">
        <div className="label-meta" style={{ marginBottom: '4px', color: 'var(--text-muted)' }}>
          Reusable Decision Rule
        </div>
        {question.decisionRule}
      </div>

      {/* Distractor Analysis Table */}
      <div style={{ margin: 'var(--space-6) 0' }}>
        <div className="label-meta" style={{ marginBottom: 'var(--space-2)' }}>
          Alternative Options Analysis
        </div>
        <table className="distractor-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Option</th>
              <th>Evaluation & Distinction</th>
            </tr>
          </thead>
          <tbody>
            {question.distractorAnalysis.map((dist) => {
              const isUserChoice = dist.choiceId === selectedAnswer;
              return (
                <tr key={dist.choiceId} style={isUserChoice ? { backgroundColor: 'var(--bg-subtle)' } : {}}>
                  <td style={{ fontWeight: 700, color: isUserChoice ? 'var(--signal-swiss-red)' : 'var(--text-main)' }}>
                    Option {dist.choiceId}
                    {isUserChoice && <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 500 }}>Your choice</span>}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {dist.reason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Metadata Footer */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <span><strong>Task:</strong> {question.ecoTask}</span>
        <span><strong>Approach:</strong> {question.deliveryApproach}</span>
        <span><strong>Source:</strong> {question.sourceReference}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onNext}
          className="btn-swiss btn-swiss-primary"
          style={{ minWidth: '160px' }}
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
