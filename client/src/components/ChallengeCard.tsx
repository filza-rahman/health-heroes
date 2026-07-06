import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  emoji: string;
  reward: number;
  color: string;
  onComplete: (id: string, reward: number) => void;
}

export function ChallengeCard({
  id,
  title,
  description,
  emoji,
  reward,
  color,
  onComplete,
}: ChallengeCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setIsCompleting(true);
    setTimeout(() => {
      setIsCompleted(true);
      onComplete(id, reward);
      setTimeout(() => {
        setIsCompleting(false);
        setIsCompleted(false);
      }, 2000);
    }, 400);
  };

  return (
    <Card
      className={`card-glow p-6 border-0 bg-gradient-to-br from-white to-slate-50 transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-lime-400' : ''
      }`}
    >
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 ${
          isCompleting ? 'scale-110' : ''
        }`}
      >
        <span className="text-3xl">{emoji}</span>
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-600 mb-4 text-sm">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-lime-100 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-lime-600" />
          <span className="font-bold text-lime-600">+{reward}</span>
        </div>
      </div>
      <button
        onClick={handleClick}
        disabled={isCompleting}
        className={`w-full btn-lime py-2 text-sm transition-all duration-300 ${
          isCompleted ? 'bg-green-500 text-white' : ''
        } ${isCompleting ? 'scale-95' : ''}`}
      >
        {isCompleted ? '✓ Quest Complete!' : 'Complete Quest'}
      </button>
    </Card>
  );
}
