import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  totalPoints: number;
  streak: number;
  badges: string[];
  completedChallenges: Record<string, number>; // challengeId -> count
  lastActiveDate: string;
}

interface GameContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  createUser: (name: string) => void;
  updatePoints: (points: number) => void;
  updateStreak: () => void;
  completeChallenge: (challengeId: string, points: number) => void;
  addBadge: (badgeId: string) => void;
  logout: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('healthHeroesUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to load user:', e);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('healthHeroesUser', JSON.stringify(user));
    }
  }, [user]);

  const createUser = (name: string) => {
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name,
      totalPoints: 0,
      streak: 0,
      badges: [],
      completedChallenges: {},
      lastActiveDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  };

  const updatePoints = (points: number) => {
    setUser(prev => prev ? { ...prev, totalPoints: prev.totalPoints + points } : null);
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setUser(prev => {
      if (!prev) return null;
      const lastActive = prev.lastActiveDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      // If last active was yesterday, increment streak; if today, keep it; otherwise reset
      const newStreak = lastActive === yesterday ? prev.streak + 1 : (lastActive === today ? prev.streak : 1);
      
      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      };
    });
  };

  const completeChallenge = (challengeId: string, points: number) => {
    updatePoints(points);
    updateStreak();
    setUser(prev => {
      if (!prev) return null;
      const count = (prev.completedChallenges[challengeId] || 0) + 1;
      return {
        ...prev,
        completedChallenges: {
          ...prev.completedChallenges,
          [challengeId]: count,
        },
      };
    });
  };

  const addBadge = (badgeId: string) => {
    setUser(prev => {
      if (!prev || prev.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      };
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthHeroesUser');
  };

  return (
    <GameContext.Provider value={{ user, isLoggedIn: !!user, createUser, updatePoints, updateStreak, completeChallenge, addBadge, logout }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
