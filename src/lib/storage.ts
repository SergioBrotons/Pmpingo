import { UserStats, UserAnswerRecord, SpacedRepetitionCard, MistakeCategory, Domain, DeliveryApproach } from '@/types';

const STORAGE_KEYS = {
  STATS: 'pmpingo_user_stats_v1',
  HISTORY: 'pmpingo_answer_history_v1',
  SPACED_CARDS: 'pmpingo_spaced_cards_v1',
  STUDY_HALL: 'pmpingo_study_hall_v1',
};

export const INITIAL_USER_STATS: UserStats = {
  xp: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  level: 1,
  questionsAttempted: 0,
  questionsCorrect: 0,
  diagnosticCompleted: false,
  domainMastery: {
    People: 50,
    Process: 50,
    'Business Environment': 50,
  },
  approachMastery: {
    Predictive: 50,
    Agile: 50,
    Hybrid: 50,
  },
};

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') return INITIAL_USER_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return INITIAL_USER_STATS;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading stats from localStorage:', err);
    return INITIAL_USER_STATS;
  }
}

export function saveStoredStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed saving stats to localStorage:', err);
  }
}

export function getAnswerHistory(): UserAnswerRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordAnswer(record: UserAnswerRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getAnswerHistory();
    history.push(record);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to record answer:', err);
  }
}

export function getSpacedRepetitionCards(): SpacedRepetitionCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SPACED_CARDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updateSpacedCard(questionId: string, isCorrect: boolean, mistakeCategory?: MistakeCategory): void {
  if (typeof window === 'undefined') return;
  const cards = getSpacedRepetitionCards();
  const index = cards.findIndex((c) => c.questionId === questionId);
  const now = Date.now();

  const intervals = [1, 2, 4, 7, 14]; // intervals in days per box

  if (index >= 0) {
    const card = cards[index];
    card.timesSeen += 1;
    if (isCorrect) {
      card.timesCorrect += 1;
      card.box = Math.min(5, card.box + 1);
    } else {
      card.box = 1; // Reset to box 1 on failure
      card.lastMistakeCategory = mistakeCategory;
    }
    card.intervalDays = intervals[card.box - 1];
    card.nextReviewDate = now + card.intervalDays * 86400000;
  } else {
    cards.push({
      questionId,
      box: isCorrect ? 2 : 1,
      intervalDays: isCorrect ? 2 : 1,
      nextReviewDate: now + (isCorrect ? 2 : 1) * 86400000,
      timesSeen: 1,
      timesCorrect: isCorrect ? 1 : 0,
      lastMistakeCategory: mistakeCategory,
    });
  }

  localStorage.setItem(STORAGE_KEYS.SPACED_CARDS, JSON.stringify(cards));
}

export function calculateUpdatedXP(
  currentStats: UserStats,
  isCorrect: boolean,
  isSpacedRecall: boolean,
  domain: Domain,
  approach: DeliveryApproach
): { newStats: UserStats; earnedXP: number } {
  let earnedXP = 0;
  if (isCorrect) {
    earnedXP = isSpacedRecall ? 10 : 10;
  }

  const today = new Date().toISOString().split('T')[0];
  let streak = currentStats.streakDays;
  if (currentStats.lastStudyDate !== today) {
    streak += 1;
  }

  const newAttempted = currentStats.questionsAttempted + 1;
  const newCorrect = currentStats.questionsCorrect + (isCorrect ? 1 : 0);
  const newXP = currentStats.xp + earnedXP;

  // Calculate Level (1 to 6)
  // Level 1: 0-100 XP, Level 2: 101-300, Level 3: 301-600, Level 4: 601-1000, Level 5: 1001-1500, Level 6: 1500+
  let level = 1;
  if (newXP >= 1500) level = 6;
  else if (newXP >= 1000) level = 5;
  else if (newXP >= 600) level = 4;
  else if (newXP >= 300) level = 3;
  else if (newXP >= 100) level = 2;

  // Adjust domain mastery
  const updatedDomainMastery = { ...currentStats.domainMastery };
  const delta = isCorrect ? 3 : -4;
  updatedDomainMastery[domain] = Math.max(10, Math.min(98, updatedDomainMastery[domain] + delta));

  const updatedApproachMastery = { ...currentStats.approachMastery };
  if (approach === 'Predictive' || approach === 'Agile' || approach === 'Hybrid') {
    updatedApproachMastery[approach] = Math.max(10, Math.min(98, updatedApproachMastery[approach] + delta));
  }

  const newStats: UserStats = {
    ...currentStats,
    xp: newXP,
    streakDays: streak,
    lastStudyDate: today,
    level,
    questionsAttempted: newAttempted,
    questionsCorrect: newCorrect,
    domainMastery: updatedDomainMastery,
    approachMastery: updatedApproachMastery,
  };

  saveStoredStats(newStats);
  return { newStats, earnedXP };
}
