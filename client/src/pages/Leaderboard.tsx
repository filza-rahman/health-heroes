import { Trophy, Medal, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Leaderboard() {
  const leaderboard = [
    { rank: 1, name: 'Alex Champion', points: 2450, streak: 28, avatar: '🦸' },
    { rank: 2, name: 'Jordan Quest', points: 2180, streak: 24, avatar: '🧗' },
    { rank: 3, name: 'Casey Fitness', points: 1950, streak: 21, avatar: '🏃' },
    { rank: 4, name: 'Morgan Health', points: 1720, streak: 18, avatar: '🤸' },
    { rank: 5, name: 'Taylor Victory', points: 1540, streak: 15, avatar: '⛹️' },
    { rank: 6, name: 'Riley Strong', points: 1320, streak: 12, avatar: '🚴' },
    { rank: 7, name: 'Jamie Wellness', points: 1150, streak: 10, avatar: '🧘' },
    { rank: 8, name: 'Sam Hero', points: 950, streak: 8, avatar: '💪' },
  ];

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold text-slate-900">Leaderboard</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
        <div className="container text-center">
          <h2 className="text-5xl font-bold text-white mb-4">🏆 Health Heroes Ranking</h2>
          <p className="text-xl text-white/90">See who's leading the health revolution!</p>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-4">
            {leaderboard.map((player, idx) => (
              <Card
                key={player.rank}
                className={`card-glow p-6 border-0 flex items-center justify-between transition-all duration-300 hover:scale-102 ${
                  player.rank <= 3
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50'
                    : 'bg-white'
                }`}
                style={{
                  animation: `slide-in 0.5s ease-out forwards`,
                  animationDelay: `${idx * 50}ms`,
                  opacity: 0,
                }}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-4xl font-bold w-12 text-center">
                    {getMedalIcon(player.rank)}
                  </div>
                  <div className="text-3xl">{player.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{player.name}</h3>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span>Rank #{player.rank}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{player.points}</div>
                    <div className="text-xs text-slate-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="text-xl">🔥</span>
                      <span className="text-2xl font-bold text-orange-500">{player.streak}</span>
                    </div>
                    <div className="text-xs text-slate-600">Streak</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-yellow-50 to-orange-50 text-center">
              <div className="text-5xl mb-4">🥇</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Top Performer</h4>
              <p className="text-2xl font-bold gradient-lime-purple bg-clip-text text-transparent">Alex Champion</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-purple-50 to-pink-50 text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Hottest Streak</h4>
              <p className="text-2xl font-bold text-purple-600">28 Days</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-cyan-50 to-blue-50 text-center">
              <div className="text-5xl mb-4">👥</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Total Heroes</h4>
              <p className="text-2xl font-bold text-cyan-600">8,342</p>
            </Card>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
