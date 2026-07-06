import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, Flame } from 'lucide-react';

interface ChallengeInteractiveProps {
  challengeId: string;
  title: string;
  description: string;
  emoji: string;
  reward: number;
  color: string;
  onComplete: (points: number) => void;
}

export function ChallengeInteractive({
  challengeId,
  title,
  description,
  emoji,
  reward,
  color,
  onComplete,
}: ChallengeInteractiveProps) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
          return 100;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    setProgress(0);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    onComplete(reward);
    setTimeout(() => {
      setIsActive(false);
      setProgress(0);
      setIsCompleted(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Animated Emoji */}
      <motion.div
        className="flex justify-center"
        animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
      >
        <div className="text-9xl">{emoji}</div>
      </motion.div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-xl text-slate-600">{description}</p>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-slate-200 rounded-full h-8 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${color} flex items-center justify-center`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {progress > 10 && (
                <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
              )}
            </motion.div>
          </div>
          <p className="text-center text-slate-600 font-semibold">
            Keep going! {Math.round(progress)}% complete
          </p>
        </motion.div>
      )}

      {/* Completion Message */}
      {isCompleted && (
        <motion.div
          className="bg-gradient-to-r from-lime-100 to-green-100 p-8 rounded-3xl text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">Challenge Complete!</span>
          </div>
          <p className="text-xl text-slate-700 mb-4">
            You earned <span className="font-bold text-lime-600">{reward} points</span>!
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleComplete}
              className="btn-lime px-8 py-3 text-lg"
            >
              Claim Reward <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight + 100,
                opacity: 0,
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              {['🎉', '⭐', '🎊', '✨', '🌟'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Start Button */}
      {!isActive && !isCompleted && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleStart}
            className={`btn-lime px-12 py-4 text-2xl font-bold`}
          >
            Start Challenge <Flame className="w-6 h-6 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
