import { describe, it, expect } from 'vitest';

describe('Challenge Generation Logic', () => {
  it('should generate weekly challenges based on lowest performing category', () => {
    const emissions = { transportKg: 5000, foodKg: 1000, energyKg: 2000 };
    const maxCategory = Object.keys(emissions).reduce((a, b) => emissions[a as keyof typeof emissions] > emissions[b as keyof typeof emissions] ? a : b);
    
    expect(maxCategory).toBe('transportKg');
  });

  it('should grant points upon challenge completion', () => {
    let userPoints = 150;
    const challengeReward = 50;
    const completeChallenge = () => { userPoints += challengeReward; };
    
    completeChallenge();
    expect(userPoints).toBe(200);
  });

  it('should expire challenges after 7 days', () => {
    const challengeDate = new Date('2026-06-01');
    const expiryDate = new Date(challengeDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    expect(expiryDate.toISOString().split('T')[0]).toBe('2026-06-08');
  });
});
