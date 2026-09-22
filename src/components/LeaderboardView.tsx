'use client';

import React, { useState, useEffect } from 'react';
import { UserStats } from '@/types';
import {
  ColleagueProfile,
  getLeaderboard,
  toggleLocalFollow,
  syncProfileToSupabase,
} from '@/lib/supabase';
import { UserPlus, UserCheck, Trophy, Flame, Star, Check } from 'lucide-react';

interface LeaderboardViewProps {
  stats: UserStats;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats }) => {
  const [colleagues, setColleagues] = useState<ColleagueProfile[]>([]);
  const [filter, setFilter] = useState<'all' | 'following'>('all');
  const [displayName, setDisplayName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load stored display name
    const stored = localStorage.getItem('pmpingo_display_name') || 'Sergio (You)';
    setDisplayName(stored);

    // Fetch leaderboard
    getLeaderboard().then((list) => setColleagues(list));
  }, []);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    await syncProfileToSupabase(stats, displayName.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    const updated = await getLeaderboard();
    setColleagues(updated);
  };

  const handleToggleFollow = (id: string) => {
    const isNowFollowing = toggleLocalFollow(id);
    setColleagues((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFollowing: isNowFollowing } : c))
    );
  };

  const displayedList = filter === 'following'
    ? colleagues.filter((c) => c.isFollowing)
    : colleagues;

  return (
    <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <span className="label-meta">Study Circle</span>
        <h1 style={{ marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
          Colleague Ranking & Leaderboard
        </h1>
        <p className="text-body-lead text-secondary" style={{ maxWidth: '680px' }}>
          Follow fellow project managers, compare daily study streaks, and stay accountable across the 28-day curriculum.
        </p>
      </div>

      <div className="grid-12">
        {/* Left Column (8 cols): Leaderboard Table */}
        <div className="col-span-8">
          <div className="panel" style={{ padding: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-4) var(--space-6)',
                borderBottom: '1px solid var(--border-hairline)',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button
                  onClick={() => setFilter('all')}
                  className={`btn-confidence ${filter === 'all' ? 'active' : ''}`}
                  style={{ minHeight: '32px' }}
                >
                  All Colleagues ({colleagues.length})
                </button>
                <button
                  onClick={() => setFilter('following')}
                  className={`btn-confidence ${filter === 'following' ? 'active' : ''}`}
                  style={{ minHeight: '32px' }}
                >
                  Following ({colleagues.filter((c) => c.isFollowing).length})
                </button>
              </div>

              <span className="label-meta">Ranked by Total XP</span>
            </div>

            {/* Table */}
            <div className="distractor-table-wrap">
              <table className="distractor-table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th style={{ width: '60px', paddingLeft: 'var(--space-6)' }}>Rank</th>
                    <th>Colleague</th>
                    <th>Plan Day</th>
                    <th>Streak</th>
                    <th>Accuracy</th>
                    <th>XP</th>
                    <th style={{ width: '100px', textAlign: 'right', paddingRight: 'var(--space-6)' }}>Follow</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedList.map((colleague, idx) => (
                    <tr key={colleague.id}>
                      <td
                        style={{
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          paddingLeft: 'var(--space-6)',
                          fontFeatureSettings: '"tnum"',
                          color: idx === 0 ? 'var(--signal-amber)' : idx === 1 ? 'var(--signal-blue)' : 'var(--text-secondary)',
                        }}
                      >
                        #{idx + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                          {colleague.display_name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Level {colleague.level} Practitioner
                        </div>
                      </td>
                      <td style={{ fontFeatureSettings: '"tnum"', color: 'var(--text-secondary)' }}>
                        Day {colleague.current_day}/28
                      </td>
                      <td style={{ fontFeatureSettings: '"tnum"', color: 'var(--signal-amber)', fontWeight: 600 }}>
                        {colleague.streak_days}d 🔥
                      </td>
                      <td style={{ fontFeatureSettings: '"tnum"', color: 'var(--signal-green)', fontWeight: 600 }}>
                        {colleague.accuracy_pct}%
                      </td>
                      <td style={{ fontFeatureSettings: '"tnum"', fontWeight: 700, color: 'var(--text-main)' }}>
                        {colleague.xp}
                      </td>
                      <td style={{ textAlign: 'right', paddingRight: 'var(--space-6)' }}>
                        <button
                          onClick={() => handleToggleFollow(colleague.id)}
                          className={`btn-swiss ${colleague.isFollowing ? 'btn-swiss-secondary' : 'btn-swiss-primary'}`}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', minHeight: '30px' }}
                        >
                          {colleague.isFollowing ? (
                            <>
                              <UserCheck size={13} color="var(--signal-green)" />
                              <span>Following</span>
                            </>
                          ) : (
                            <>
                              <UserPlus size={13} />
                              <span>Follow</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): User Profile & Supabase Sync */}
        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Profile Card */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Your Leaderboard Identity</span>
            </div>

            <form onSubmit={handleSaveName} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <label className="label-meta" style={{ display: 'block', marginBottom: '4px' }}>
                  Colleague Display Name:
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Sergio B."
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-main)',
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-swiss btn-swiss-primary"
                style={{ padding: '8px 14px', fontSize: '0.825rem' }}
              >
                {isSaved ? <Check size={14} color="var(--signal-green)" /> : null}
                <span>{isSaved ? 'Identity Synced' : 'Update & Sync to Leaderboard'}</span>
              </button>
            </form>

            <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-3)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div><strong>Your Current Stats:</strong></div>
              <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>XP:</span> <strong style={{ fontFeatureSettings: '"tnum"' }}>{stats.xp}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Streak:</span> <strong style={{ fontFeatureSettings: '"tnum"' }}>{stats.streakDays} Days 🔥</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Accuracy:</span>{' '}
                <strong style={{ fontFeatureSettings: '"tnum"' }}>
                  {stats.questionsAttempted > 0
                    ? `${Math.round((stats.questionsCorrect / stats.questionsAttempted) * 100)}%`
                    : '—'}
                </strong>
              </div>
            </div>
          </div>

          {/* Cloud Sync Status */}
          <div className="panel">
            <div className="panel-header">
              <span className="label-meta">Database Status</span>
              <span className="tag tag-process">Supabase Ready</span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Connect your project by adding <code style={{ fontSize: '0.78rem' }}>NEXT_PUBLIC_SUPABASE_URL</code> and <code style={{ fontSize: '0.78rem' }}>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your Vercel Environment Variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
