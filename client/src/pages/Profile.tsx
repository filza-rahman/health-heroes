import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { LogOut, Home, Trophy, Flame, Star } from 'lucide-react';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout } = useGame();

  if (!user) {
    setLocation('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation('/auth');
  };

  const totalChallengesCompleted = Object.values(user.completedChallenges).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Home
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <section className="py-20">
        <div className="container max-w-2xl">
          {/* Hero Card */}
          <Card className="card-glow p-12 border-0 bg-gradient-to-br from-purple-50 to-pink-50 mb-8">
            <div className="text-center">
              <div className="text-8xl mb-4">🦸</div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">{user.name}</h2>
              <p className="text-lg text-slate-600">Health Hero</p>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-lime-50 to-green-50 text-center">
              <div className="text-5xl font-bold gradient-lime-purple bg-clip-text text-transparent mb-2">
                {user.totalPoints}
              </div>
              <p className="text-lg text-slate-600 font-semibold">Total Points</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-orange-50 to-red-50 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-8 h-8 text-orange-500" />
                <span className="text-5xl font-bold text-orange-600">{user.streak}</span>
              </div>
              <p className="text-lg text-slate-600 font-semibold">Day Streak</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-cyan-50 to-blue-50 text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">{totalChallengesCompleted}</div>
              <p className="text-lg text-slate-600 font-semibold">Challenges Done</p>
            </Card>
          </div>

          {/* Badges */}
          <Card className="card-glow p-8 border-0 bg-white mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Badges Earned
            </h3>
            {user.badges.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {user.badges.map((badge) => (
                  <div key={badge} className="text-center">
                    <div className="text-5xl mb-2">
                      {badge === 'first_steps' && '👟'}
                      {badge === 'week_warrior' && '⚔️'}
                      {badge === 'health_hero' && '🦸'}
                      {badge === 'legendary' && '👑'}
                    </div>
                    <p className="text-xs font-semibold text-slate-600">
                      {badge === 'first_steps' && 'First Steps'}
                      {badge === 'week_warrior' && 'Week Warrior'}
                      {badge === 'health_hero' && 'Health Hero'}
                      {badge === 'legendary' && 'Legendary'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">Complete challenges to earn badges!</p>
            )}
          </Card>

          {/* Challenge History */}
          <Card className="card-glow p-8 border-0 bg-white">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Challenge History
            </h3>
            {Object.keys(user.completedChallenges).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(user.completedChallenges).map(([challengeId, count]) => (
                  <div key={challengeId} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-900 capitalize">{challengeId}</span>
                    <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-bold">{count}x</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No challenges completed yet. Start your journey!</p>
            )}
          </Card>

          {/* Back to Home */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setLocation('/')}
              className="btn-lime px-12 py-3 text-lg"
            >
              Back to Challenges
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

