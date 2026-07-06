import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGame } from '@/contexts/GameContext';
import { Heart } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const { createUser, isLoggedIn } = useGame();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (isLoggedIn) {
    setLocation('/profile');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    createUser(name);
    setLocation('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-lime-500 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-lime-purple flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-slate-900 mb-2">Health Heroes</h1>
        <p className="text-center text-slate-600 mb-8">Begin your wellness journey today!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What's your name, Hero?
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="text-lg py-3"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <Button
            type="submit"
            className="btn-lime w-full py-3 text-lg font-bold"
          >
            Create My Hero Profile 🦸
          </Button>
        </form>

        <p className="text-center text-slate-600 text-sm mt-8">
          Your progress will be saved locally on this device
        </p>
      </div>
    </div>
  );
}

