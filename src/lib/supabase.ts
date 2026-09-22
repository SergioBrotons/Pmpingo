import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserStats } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface ColleagueProfile {
  id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  streak_days: number;
  level: number;
  current_day: number;
  accuracy_pct: number;
  isFollowing?: boolean;
}

const LOCAL_COLLEAGUES: ColleagueProfile[] = [
  { id: '1', display_name: 'Elena Rostova', xp: 1420, streak_days: 18, level: 5, current_day: 14, accuracy_pct: 88 },
  { id: '2', display_name: 'Marcus Vance', xp: 980, streak_days: 12, level: 4, current_day: 10, accuracy_pct: 82 },
  { id: '3', display_name: 'Sarah Chen', xp: 860, streak_days: 9, level: 3, current_day: 8, accuracy_pct: 85 },
  { id: '4', display_name: 'David Kim', xp: 640, streak_days: 7, level: 3, current_day: 6, accuracy_pct: 81 },
  { id: '5', display_name: 'Claire Moreau', xp: 420, streak_days: 4, level: 2, current_day: 4, accuracy_pct: 78 },
];

export async function getLeaderboard(currentUserId?: string): Promise<ColleagueProfile[]> {
  const localFollowsRaw = typeof window !== 'undefined' ? localStorage.getItem('pmpingo_follows') : null;
  const localFollows: string[] = localFollowsRaw ? JSON.parse(localFollowsRaw) : [];

  if (!supabase) {
    // Return local mock colleagues with following status
    return LOCAL_COLLEAGUES.map((c) => ({
      ...c,
      isFollowing: localFollows.includes(c.id),
    }));
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('xp', { ascending: false })
      .limit(50);

    if (error || !data) {
      console.warn('Supabase fetch failed, falling back to local colleagues:', error);
      return LOCAL_COLLEAGUES.map((c) => ({
        ...c,
        isFollowing: localFollows.includes(c.id),
      }));
    }

    return data.map((item) => ({
      id: item.id,
      display_name: item.display_name,
      avatar_url: item.avatar_url,
      xp: item.xp,
      streak_days: item.streak_days,
      level: item.level,
      current_day: item.current_day,
      accuracy_pct: item.accuracy_pct,
      isFollowing: localFollows.includes(item.id),
    }));
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return LOCAL_COLLEAGUES;
  }
}

export function toggleLocalFollow(colleagueId: string): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem('pmpingo_follows');
  const follows: string[] = raw ? JSON.parse(raw) : [];

  let isNowFollowing = false;
  if (follows.includes(colleagueId)) {
    const next = follows.filter((id) => id !== colleagueId);
    localStorage.setItem('pmpingo_follows', JSON.stringify(next));
    isNowFollowing = false;
  } else {
    follows.push(colleagueId);
    localStorage.setItem('pmpingo_follows', JSON.stringify(follows));
    isNowFollowing = true;
  }

  return isNowFollowing;
}

export async function syncProfileToSupabase(stats: UserStats, displayName: string): Promise<void> {
  if (typeof window === 'undefined') return;

  // Store local username
  localStorage.setItem('pmpingo_display_name', displayName);

  if (!supabase) return;

  try {
    const accuracy = stats.questionsAttempted > 0
      ? Math.round((stats.questionsCorrect / stats.questionsAttempted) * 100)
      : 0;

    let profileId = localStorage.getItem('pmpingo_user_id');

    if (!profileId) {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            display_name: displayName,
            xp: stats.xp,
            streak_days: stats.streakDays,
            level: stats.level,
            current_day: stats.diagnosticCompleted ? 1 : 0,
            questions_attempted: stats.questionsAttempted,
            questions_correct: stats.questionsCorrect,
            accuracy_pct: accuracy,
          },
        ])
        .select('id')
        .single();

      if (data) {
        localStorage.setItem('pmpingo_user_id', data.id);
      }
    } else {
      await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          xp: stats.xp,
          streak_days: stats.streakDays,
          level: stats.level,
          current_day: stats.diagnosticCompleted ? 1 : 0,
          questions_attempted: stats.questionsAttempted,
          questions_correct: stats.questionsCorrect,
          accuracy_pct: accuracy,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId);
    }
  } catch (err) {
    console.error('Failed syncing profile to Supabase:', err);
  }
}
