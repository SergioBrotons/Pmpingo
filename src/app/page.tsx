'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TodayView } from '@/components/TodayView';
import { QuestionCard } from '@/components/QuestionCard';
import { DebriefModal } from '@/components/DebriefModal';
import { CurriculumView } from '@/components/CurriculumView';
import { MistakeLabView } from '@/components/MistakeLabView';
import { ProgressView } from '@/components/ProgressView';
import { ExportPackModal } from '@/components/ExportPackModal';
import { QUESTIONS_BANK } from '@/data/questions';
import { CURRICULUM_DAYS } from '@/data/curriculum';
import {
  getStoredStats,
  saveStoredStats,
  recordAnswer,
  updateSpacedCard,
  calculateUpdatedXP,
  getSpacedRepetitionCards,
  INITIAL_USER_STATS,
} from '@/lib/storage';
import { Question, ConfidenceLevel, UserStats, SpacedRepetitionCard, MistakeCategory } from '@/types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PMPingoApp() {
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [spacedCards, setSpacedCards] = useState<SpacedRepetitionCard[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('today');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Active Practice Queue
  const [activeQueue, setActiveQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel>(3);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [lastEarnedXP, setLastEarnedXP] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionScore, setSessionScore] = useState({ attempted: 0, correct: 0 });

  useEffect(() => {
    const loaded = getStoredStats();
    setStats(loaded);
    setSpacedCards(getSpacedRepetitionCards());

    const diagnostics = QUESTIONS_BANK.filter((q) => q.isDiagnostic);
    setActiveQueue(diagnostics);
  }, []);

  const handleStartStudy = (questions: Question[]) => {
    setActiveQueue(questions);
    setCurrentIndex(0);
    setIsAnswerSubmitted(false);
    setSelectedAnswer(null);
    setSessionCompleted(false);
    setSessionScore({ attempted: 0, correct: 0 });
    setCurrentTab('practice');
  };

  const handleStartDayCurriculum = (dayNumber: number) => {
    const dayData = CURRICULUM_DAYS.find((d) => d.day === dayNumber);
    if (!dayData) return;
    const questions = QUESTIONS_BANK.filter((q) => dayData.questionIds.includes(q.id));
    handleStartStudy(questions.length > 0 ? questions : QUESTIONS_BANK.slice(0, 3));
  };

  const handlePracticeWeakSpots = () => {
    const weakQuestions = QUESTIONS_BANK.filter((q) => !q.isDiagnostic).slice(0, 3);
    handleStartStudy(weakQuestions.length > 0 ? weakQuestions : QUESTIONS_BANK.slice(0, 3));
  };

  const handleSubmitAnswer = (choiceId: string, confidence: ConfidenceLevel) => {
    const currentQuestion = activeQueue[currentIndex];
    if (!currentQuestion) return;

    setSelectedAnswer(choiceId);
    setSelectedConfidence(confidence);
    setIsAnswerSubmitted(true);

    const isCorrect = choiceId === currentQuestion.correctAnswer;

    // Record answer & update Spaced Repetition queue
    recordAnswer({
      questionId: currentQuestion.id,
      selectedAnswer: choiceId,
      isCorrect,
      confidence,
      primaryMistake: isCorrect ? undefined : currentQuestion.diagnosedMistake,
      timestamp: Date.now(),
    });

    updateSpacedCard(currentQuestion.id, isCorrect, isCorrect ? undefined : currentQuestion.diagnosedMistake);
    setSpacedCards(getSpacedRepetitionCards());

    // XP calculation
    const { newStats, earnedXP } = calculateUpdatedXP(
      stats,
      isCorrect,
      false,
      currentQuestion.domain,
      currentQuestion.deliveryApproach
    );

    setLastEarnedXP(earnedXP);
    setStats(newStats);
    setSessionScore((prev) => ({
      attempted: prev.attempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQueue.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
      setSelectedAnswer(null);
    } else {
      setSessionCompleted(true);
      if (activeQueue.some((q) => q.isDiagnostic)) {
        const updated = { ...stats, diagnosticCompleted: true };
        setStats(updated);
        saveStoredStats(updated);
      }
    }
  };

  const handleStudyHallLogged = (category: MistakeCategory) => {
    const updatedStats = { ...stats, xp: stats.xp + 15 };
    setStats(updatedStats);
    saveStoredStats(updatedStats);
    setSpacedCards(getSpacedRepetitionCards());
  };

  const handleSelectTab = (tabId: string) => {
    if (tabId === 'export') {
      setIsExportOpen(true);
    } else {
      setCurrentTab(tabId);
    }
  };

  const currentQuestion = activeQueue[currentIndex];

  return (
    <div>
      <Header
        stats={stats}
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      <div className="swiss-container">
        {/* TAB 1: TODAY (MISSION CONTROL) */}
        {currentTab === 'today' && (
          <TodayView
            stats={stats}
            spacedCards={spacedCards}
            onStartToday={() => handleStartStudy(QUESTIONS_BANK.filter((q) => !q.isDiagnostic))}
            onStartDiagnostic={() => handleStartStudy(QUESTIONS_BANK.filter((q) => q.isDiagnostic))}
            onOpenLearn={() => setCurrentTab('learn')}
          />
        )}

        {/* TAB 2: LEARN (28-DAY CURRICULUM) */}
        {currentTab === 'learn' && (
          <CurriculumView onStartDay={handleStartDayCurriculum} />
        )}

        {/* TAB 3: PRACTICE (ASSESSMENT QUESTION ENGINE) */}
        {currentTab === 'practice' && (
          <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
            {sessionCompleted ? (
              <div className="panel" style={{ padding: 'var(--space-8)' }}>
                <span className="label-meta" style={{ color: 'var(--signal-green)' }}>
                  Session Complete
                </span>
                <h2 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
                  Performance Evaluation Calibrated
                </h2>
                <p className="text-secondary" style={{ maxWidth: '640px', marginBottom: 'var(--space-6)' }}>
                  Decision records have been synthesized into your spaced repetition queue and mastery profile.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4) 0',
                    borderTop: '1px solid var(--border-hairline)',
                    borderBottom: '1px solid var(--border-hairline)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <div>
                    <span className="label-meta">Score</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2px', fontFeatureSettings: '"tnum"' }}>
                      {sessionScore.correct} / {sessionScore.attempted}
                    </div>
                  </div>
                  <div>
                    <span className="label-meta">Accuracy</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2px', fontFeatureSettings: '"tnum"' }}>
                      {sessionScore.attempted > 0 ? Math.round((sessionScore.correct / sessionScore.attempted) * 100) : 100}%
                    </div>
                  </div>
                  <div>
                    <span className="label-meta">Streak</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2px', fontFeatureSettings: '"tnum"' }}>
                      {stats.streakDays} Days
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button
                    onClick={() => handleStartStudy(QUESTIONS_BANK.filter((q) => !q.isDiagnostic))}
                    className="btn-swiss btn-swiss-primary"
                  >
                    <span>Proceed to Next Scenario</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentTab('today')}
                    className="btn-swiss btn-swiss-secondary"
                  >
                    <span>Return to Mission Control</span>
                  </button>
                </div>
              </div>
            ) : currentQuestion ? (
              <div>
                <QuestionCard
                  question={currentQuestion}
                  questionIndex={currentIndex}
                  totalQuestions={activeQueue.length}
                  onSubmitAnswer={handleSubmitAnswer}
                />

                {isAnswerSubmitted && selectedAnswer && (
                  <DebriefModal
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    isCorrect={selectedAnswer === currentQuestion.correctAnswer}
                    confidence={selectedConfidence}
                    onNext={handleNextQuestion}
                    earnedXP={lastEarnedXP}
                  />
                )}
              </div>
            ) : (
              <div className="panel" style={{ padding: 'var(--space-8)' }}>
                <h3>No active practice queue</h3>
                <p className="text-secondary" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  Select a day or topic from the curriculum to begin a focused assessment.
                </p>
                <button
                  onClick={() => setCurrentTab('today')}
                  className="btn-swiss btn-swiss-primary"
                >
                  <span>Go to Mission Control</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MISTAKES (PERFORMANCE REVIEW) */}
        {currentTab === 'mistakes' && (
          <MistakeLabView onPracticeWeakSpots={handlePracticeWeakSpots} />
        )}

        {/* TAB 5: PROGRESS (ANALYTICAL OVERVIEW & STUDY HALL) */}
        {currentTab === 'progress' && (
          <ProgressView stats={stats} onLogStudyHall={handleStudyHallLogged} />
        )}
      </div>

      {/* Export Pack Modal */}
      <ExportPackModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
