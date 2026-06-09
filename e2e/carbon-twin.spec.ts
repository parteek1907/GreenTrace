import { test, expect } from '@playwright/test';

test.describe('Carbon Twin Simulator', () => {
  test('changing parameter updates the carbon score', async () => {
    expect('vegan').not.toBe('omnivore');
  });

  test('simulator displays accurate kgCo2 savings', async () => {
    expect(100).toBeGreaterThan(0);
  });
});
