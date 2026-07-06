import { useState } from 'react';
import { Heart, Flame, Zap, Moon, Apple, Smile, Trophy, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChallengeCard } from '@/components/ChallengeCard';
import { ParticleEffect } from '@/components/ParticleEffect';
import { QuestModal } from '@/components/QuestModal';
import { useLocation } from 'wouter';
import { useGame } from '@/contexts/GameContext';

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isLoggedIn } = useGame();
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const challenges = [
    {
      id: 'exercise',
      icon: Zap,
      title: '30-Min Movement Quest',
      description: 'Dance, run, or play for 30 minutes',
      reward: 50,
      color: 'from-orange-400 to-orange-500',
      emoji: '🏃'
    },
    {
      id: 'nutrition',
      icon: Apple,
      title: 'Rainbow Plate Challenge',
      description: 'Eat 5 different colored foods today',
      reward: 40,
      color: 'from-green-400 to-emerald-500',
      emoji: '🥗'
    },
    {
      id: 'sleep',
      icon: Moon,
      title: 'Sleep Champion',
      description: 'Get 8 hours of quality sleep',
      reward: 60,
      color: 'from-indigo-400 to-purple-500',
      emoji: '😴'
    },
    {
      id: 'mental',
      icon: Smile,
      title: 'Mindfulness Moment',
      description: '10 minutes of meditation or breathing',
      reward: 45,
      color: 'from-cyan-400 to-blue-500',
      emoji: '🧘'
    }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', icon: '👟', unlocked: isLoggedIn },
    { id: 2, title: 'Week Warrior', icon: '⚔️', unlocked: user?.streak || 0 >= 7 },
    { id: 3, title: 'Health Hero', icon: '🦸', unlocked: user?.totalPoints || 0 >= 500 },
    { id: 4, title: 'Legendary Legend', icon: '👑', unlocked: user?.totalPoints || 0 >= 2000 }
  ];

  const handleChallengeClick = (challengeId: string) => {
    if (!isLoggedIn) {
      setLocation('/auth');
      return;
    }
    setLocation(`/challenge?id=${challengeId}`);
  };

  const handleBeginAdventure = () => {
    if (!isLoggedIn) {
      setLocation('/auth');
    } else {
      setLocation('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <QuestModal open={showQuestModal} onClose={() => setShowQuestModal(false)} />
      <ParticleEffect trigger={showParticles} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-lime-purple flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Health Heroes</h1>
          </div>
          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-600">{user?.streak || 0}</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-lime-100 to-green-100 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-lime-500" />
                  <span className="font-bold text-lime-600">{user?.totalPoints || 0}</span>
                </div>
              </>
            )}
            <button
              onClick={() => setLocation('/leaderboard')}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-full hover:shadow-lg transition-all"
            >
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="font-bold text-yellow-600 hidden sm:inline">Leaderboard</span>
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setLocation('/profile')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full hover:shadow-lg transition-all"
              >
                <span className="font-bold text-purple-600 hidden sm:inline">Profile</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Level Up Your <span className="gradient-lime-purple bg-clip-text text-transparent">Health</span>
                </h2>
                <p className="text-xl text-slate-600">
                  Complete daily challenges, earn badges, and become a true Health Hero! 🦸
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => setShowQuestModal(true)} className="btn-lime px-8 py-3 text-lg hover:shadow-xl hover:glow-lime">Start Quest</button>
                <button onClick={() => setLocation('/leaderboard')} className="btn-purple px-8 py-3 text-lg hover:shadow-xl hover:glow-purple">View Leaderboard</button>
              </div>
            </div>
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 gradient-lime-purple rounded-3xl opacity-20 blur-3xl animate-pulse"></div>
              <div className="relative w-80 h-80 flex items-center justify-center drop-shadow-2xl animate-bounce">
                <span className="text-9xl">🦸</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenges */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-12 animate-fade-in">
            <h3 className="text-4xl font-bold text-slate-900 mb-2">Daily Challenges</h3>
            <p className="text-lg text-slate-600">Complete quests and earn rewards!</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, idx) => (
              <div
                key={challenge.id}
                className="animate-fade-in cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => handleChallengeClick(challenge.id)}
              >
                <div className="card-glow p-6 border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                  <div className="text-5xl mb-4">{challenge.emoji}</div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{challenge.title}</h4>
                  <p className="text-sm text-slate-600 mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full font-bold text-sm">+{challenge.reward}</span>
                    <button className="btn-lime px-4 py-2 text-sm">Start</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container">
          <div className="mb-12 animate-fade-in">
            <h3 className="text-4xl font-bold text-slate-900 mb-2">Your Achievements</h3>
            <p className="text-lg text-slate-600">Unlock badges and become legendary!</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={achievement.id}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`card-glow p-8 text-center border-2 transition-all duration-300 rounded-2xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                      : 'bg-slate-100 border-slate-300 opacity-50'
                  }`}
                >
                  <div className="text-6xl mb-4">{achievement.icon}</div>
                  <h4 className="text-lg font-bold text-slate-900">{achievement.title}</h4>
                  {achievement.unlocked && (
                    <div className="mt-2 text-xs font-semibold text-yellow-600">✓ UNLOCKED</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-lime-50 to-green-50 text-center animate-fade-in">
              <div className="text-5xl font-bold gradient-lime-purple bg-clip-text text-transparent mb-2">
                {user?.totalPoints || 0}
              </div>
              <p className="text-lg text-slate-600">Total Points</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-purple-50 to-pink-50 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="text-5xl font-bold text-purple-600 mb-2">{user?.streak || 0}</div>
              <p className="text-lg text-slate-600">Current Streak</p>
            </Card>
            <Card className="card-glow p-8 border-0 bg-gradient-to-br from-cyan-50 to-blue-50 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-5xl font-bold text-cyan-600 mb-2">
                {user?.badges.length || 0}
              </div>
              <p className="text-lg text-slate-600">Badges Earned</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-lime-500">
        <div className="container text-center">
          <h3 className="text-4xl font-bold text-white mb-4 animate-fade-in">Ready to Become a Health Hero?</h3>
          <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>Start your journey today and inspire your friends!</p>
          <button onClick={handleBeginAdventure} className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform duration-200 shadow-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
            Begin Your Adventure <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
