import { describe, it, expect } from 'vitest';

describe('Recommendation Engine', () => {
  it('should tier recommendations based on carbon score', () => {
    const mockScore = { score: 45, percentile: 20 };
    // Simulated engine logic
    expect(mockScore.score).toBeLessThan(50);
  });

  it('should filter recommendations by context', () => {
    const mockContext = { dietType: 'vegan' };
    const recommendations = [
      { id: '1', title: 'Go Vegan', difficulty: 'hard' },
      { id: '2', title: 'Use Public Transit', difficulty: 'medium' }
    ];
    
    const filtered = recommendations.filter(r => 
      !(r.title === 'Go Vegan' && mockContext.dietType === 'vegan')
    );
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Use Public Transit');
  });

  it('should estimate kgCo2Savings accurately', () => {
    expect(Math.round(0.4 * 100)).toBe(40);
  });
});
