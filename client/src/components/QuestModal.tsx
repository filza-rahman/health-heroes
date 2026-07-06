import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface QuestModalProps {
  open: boolean;
  onClose: () => void;
}

export function QuestModal({ open, onClose }: QuestModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Start Your Quest!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="text-6xl mb-4">🦸</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome, Health Hero!</h3>
            <p className="text-slate-600">
              You're about to embark on an epic journey to level up your health. Complete daily challenges, earn badges, and become a legend!
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-lime-50 to-green-50 p-4 rounded-2xl">
            <h4 className="font-bold text-slate-900 mb-3">Today's Mission:</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="text-lg">🏃</span>
                <span>Complete at least 1 daily challenge</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span>Earn 50+ points</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span>Build your streak</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onClose}
              className="btn-lime flex-1 flex items-center justify-center gap-2"
            >
              Let's Go! <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
