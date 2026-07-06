import { useLocation } from 'wouter';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChallengeInteractive } from '@/components/ChallengeInteractive';
import { useGame } from '@/contexts/GameContext';
import { toast } from 'sonner';

const CHALLENGES_DATA: Record<string, any> = {
  exercise: {
    title: '30-Min Movement Quest',
    description: 'Dance, run, or play for 30 minutes',
    emoji: '🏃',
    reward: 50,
    color: 'from-orange-400 to-orange-500',
    details: 'Get your body moving! Any activity counts: dancing, running, playing sports, yoga, or even active video games.',
  },
  nutrition: {
    title: 'Rainbow Plate Challenge',
    description: 'Eat 5 different colored foods today',
    emoji: '🥗',
    reward: 40,
    color: 'from-green-400 to-emerald-500',
    details: 'Try to eat foods of different colors: red (tomato), orange (carrot), yellow (banana), green (broccoli), purple (grape).',
  },
  sleep: {
    title: 'Sleep Champion',
    description: 'Get 8 hours of quality sleep',
    emoji: '😴',
    reward: 60,
    color: 'from-indigo-400 to-purple-500',
    details: 'A good night\'s sleep is crucial for your health. Try to get 8 hours and wake up refreshed!',
  },
  mental: {
    title: 'Mindfulness Moment',
    description: '10 minutes of meditation or breathing',
    emoji: '🧘',
    reward: 45,
    color: 'from-cyan-400 to-blue-500',
    details: 'Take a moment to relax. Try deep breathing, meditation, or just sitting quietly with your thoughts.',
  },
};

export default function ChallengeDetail() {
  const [, setLocation] = useLocation();
  const { user, completeChallenge } = useGame();
  
  // Get challenge ID from URL
  const challengeId = new URLSearchParams(window.location.search).get('id') || 'exercise';
  const challenge = CHALLENGES_DATA[challengeId];

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Challenge Not Found</h1>
          <Button onClick={() => setLocation('/')} className="btn-lime">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleChallengeComplete = (points: number) => {
    if (user) {
      completeChallenge(challengeId, points);
      toast.success(`🎉 Challenge completed! +${points} points!`);
      setTimeout(() => setLocation('/'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Health Heroes</h1>
          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Challenge Container */}
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <ChallengeInteractive
              challengeId={challengeId}
              title={challenge.title}
              description={challenge.description}
              emoji={challenge.emoji}
              reward={challenge.reward}
              color={challenge.color}
              onComplete={handleChallengeComplete}
            />

            {/* Challenge Details */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Challenge Details</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{challenge.details}</p>
              
              <div className="mt-8 bg-gradient-to-r from-lime-50 to-green-50 p-6 rounded-2xl">
                <p className="text-sm text-slate-600 mb-2">Reward for completion:</p>
                <p className="text-3xl font-bold gradient-lime-purple bg-clip-text text-transparent">
                  +{challenge.reward} Points
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
