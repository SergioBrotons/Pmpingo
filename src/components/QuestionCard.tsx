'use client';

import React, { useState } from 'react';
import { Question, ConfidenceLevel } from '@/types';
import { ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (selectedChoice: string, confidence: ConfidenceLevel) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onSubmitAnswer,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel>(3);

  const handleSubmit = () => {
    if (!selectedChoice) return;
    onSubmitAnswer(selectedChoice, confidence);
  };

  const getTagClass = (domain: string) => {
    if (domain === 'People') return 'tag-people';
    if (domain === 'Process') return 'tag-process';
    return 'tag-business';
  };

  return (
    <div className="panel" style={{ padding: 'var(--space-8)' }}>
      {/* Question Header & Metadata */}
      <div className="panel-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span className={`tag ${getTagClass(question.domain)}`}>
            {question.domain}
          </span>
          <span className="tag">
            {question.deliveryApproach}
          </span>
          <span className="label-meta" style={{ marginLeft: 'var(--space-2)' }}>
            {question.ecoTask}
          </span>
        </div>
        <div className="label-meta" style={{ color: 'var(--text-main)', fontFeatureSettings: '"tnum"' }}>
          Question {questionIndex + 1} of {totalQuestions}
        </div>
      </div>

      {/* Scenario Text */}
      <div className="question-scenario">
        {question.scenario}
      </div>

      {/* Options List */}
      <div className="options-list">
        {question.choices.map((choice) => {
          const isSelected = selectedChoice === choice.id;
          return (
            <div
              key={choice.id}
              className={`option-row ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedChoice(choice.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedChoice(choice.id);
                }
              }}
            >
              <div className="option-indicator">{choice.id}</div>
              <div className="option-text">{choice.text}</div>
            </div>
          );
        })}
      </div>

      {/* Discreet Confidence Calibration */}
      <div className="confidence-bar">
        <span className="label-meta" style={{ textTransform: 'none', letterSpacing: 'normal' }}>
          Indicate your decision confidence:
        </span>
        <div className="confidence-buttons">
          {[
            { level: 1, label: '1 • Guessing' },
            { level: 2, label: '2 • Uncertain' },
            { level: 3, label: '3 • Confident' },
            { level: 4, label: '4 • Very confident' },
          ].map((item) => (
            <button
              key={item.level}
              type="button"
              className={`btn-confidence ${confidence === item.level ? 'active' : ''}`}
              onClick={() => setConfidence(item.level as ConfidenceLevel)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Line */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
        <button
          onClick={handleSubmit}
          disabled={!selectedChoice}
          className="btn-swiss btn-swiss-primary"
          style={{ minWidth: '160px' }}
        >
          <span>Submit Decision</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
