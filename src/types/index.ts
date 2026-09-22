export type Domain = 'People' | 'Process' | 'Business Environment';

export type DeliveryApproach = 'Predictive' | 'Agile' | 'Hybrid' | 'Universal';

export type ConfidenceLevel = 1 | 2 | 3 | 4;

export type MasteryStatus = 'Weak' | 'Developing' | 'Functional' | 'Strong';

export type MistakeCategory =
  | 'KNOWLEDGE GAP'
  | 'MINDSET ERROR'
  | 'FIRST/NEXT ERROR'
  | 'AGILE/PREDICTIVE CONFUSION'
  | 'STAKEHOLDER ERROR'
  | 'TEAM/LEADERSHIP ERROR'
  | 'RISK/ISSUE CONFUSION'
  | 'CHANGE/BASELINE ERROR'
  | 'VALUE ERROR'
  | 'PREMATURE ESCALATION'
  | 'PROCESS BEFORE UNDERSTANDING'
  | 'QUESTION MISREAD'
  | 'OVERTHINKING'
  | 'ANSWER CHANGED'
  | 'TIME PRESSURE';

export interface QuestionChoice {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface QuestionDistractorReason {
  choiceId: string;
  reason: string;
}

export interface Question {
  id: string;
  domain: Domain;
  ecoTask: string;
  deliveryApproach: DeliveryApproach;
  difficulty: 'Standard' | 'Difficult' | 'Expert';
  scenario: string;
  choices: QuestionChoice[];
  correctAnswer: string; // 'A', 'B', 'C', or 'D'
  bestAnswerReasoning: string;
  distractorAnalysis: QuestionDistractorReason[];
  decisionRule: string;
  diagnosedMistake: MistakeCategory;
  sourceReference: string;
  isDiagnostic?: boolean;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  confidence: ConfidenceLevel;
  primaryMistake?: MistakeCategory;
  timestamp: number;
}

export interface SpacedRepetitionCard {
  questionId: string;
  box: number; // 1 to 5
  nextReviewDate: number; // timestamp
  intervalDays: number;
  timesSeen: number;
  timesCorrect: number;
  lastMistakeCategory?: MistakeCategory;
}

export interface UserStats {
  xp: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  level: number; // 1 to 6
  questionsAttempted: number;
  questionsCorrect: number;
  diagnosticCompleted: boolean;
  domainMastery: {
    People: number; // 0-100
    Process: number;
    'Business Environment': number;
  };
  approachMastery: {
    Predictive: number;
    Agile: number;
    Hybrid: number;
  };
}

export interface CurriculumDay {
  day: number;
  week: number;
  title: string;
  domain: Domain;
  ecoTask: string;
  deliveryFocus: DeliveryApproach;
  microLesson: {
    summary: string;
    whyItMatters: string;
    predictiveTake: string;
    agileTake: string;
    pmpTrap: string;
    whatToNotice: string;
  };
  questionIds: string[];
}
