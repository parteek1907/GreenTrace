import { describe, it, expect } from "vitest";
import { getBreakdown, getEquivalents } from "@/lib/carbon/calculator";

describe("Calculator Utils", () => {
  it("getBreakdown calculates percentages correctly and sorts them", () => {
    const mockScore = {
      totalKgCo2Yearly: 1000,
      transportKg: 400,
      foodKg: 300,
      energyKg: 200,
      shoppingKg: 50,
      wasteKg: 50,
      score: 80,
      percentile: 90,
      dateCalculated: new Date().toISOString()
    };

    const breakdown = getBreakdown(mockScore);
    expect(breakdown).toHaveLength(5);
    expect(breakdown[0].category).toBe("transport");
    expect(breakdown[0].percentage).toBe(40);
    expect(breakdown[1].category).toBe("food");
    expect(breakdown[1].percentage).toBe(30);
  });

  it("getEquivalents calculates tree and driving metrics", () => {
    const equivalents = getEquivalents(2200); // 100 trees, 5500 miles
    expect(equivalents[0].value).toBe(100);
    expect(equivalents[1].value).toBe(5500);
  });
});
