'use client';

import React, { useState } from 'react';
import { QUESTIONS_BANK } from '@/data/questions';
import { Download, Copy, Check, X } from 'lucide-react';

interface ExportPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportPackModal: React.FC<ExportPackModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const packData = {
    schemaVersion: '1.0.0',
    packName: 'PMPingo-ECO-2026-Export',
    exportedAt: new Date().toISOString(),
    totalQuestions: QUESTIONS_BANK.length,
    questions: QUESTIONS_BANK.map((q) => ({
      uniqueId: q.id,
      question: q.scenario,
      answerChoices: q.choices,
      correctAnswer: q.correctAnswer,
      explanation: q.bestAnswerReasoning,
      explanationOfDistractors: q.distractorAnalysis,
      ecoDomain: q.domain,
      ecoTask: q.ecoTask,
      topicTags: [q.domain, q.deliveryApproach, q.diagnosedMistake],
      deliveryApproach: q.deliveryApproach,
      difficulty: q.difficulty,
      mistakeCategoriesDiagnosed: [q.diagnosedMistake],
      shortDecisionRule: q.decisionRule,
      sourceReferences: q.sourceReference,
      isSafeForSpacedRepetition: true,
    })),
  };

  const jsonString = JSON.stringify(packData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pmpingo_eco_pack_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 20, 20, 0.45)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div
        className="panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
        }}
      >
        <div className="panel-header" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <span className="label-meta">Data Portability</span>
            <h3 style={{ marginTop: '2px' }}>Export PMP Study Pack</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-secondary)' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
          Standardized JSON representation per Section 18 of the PMPingo specification for external application integration.
        </p>

        <textarea
          readOnly
          value={jsonString}
          style={{
            flex: 1,
            minHeight: '260px',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-none)',
            color: 'var(--text-main)',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            padding: 'var(--space-3)',
            resize: 'none',
            outline: 'none',
            lineHeight: 1.4,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <button
            onClick={handleCopy}
            className="btn-swiss btn-swiss-secondary"
          >
            {copied ? <Check size={14} color="var(--signal-green)" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn-swiss btn-swiss-primary"
          >
            <Download size={14} />
            <span>Download Pack File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
