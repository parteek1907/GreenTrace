# Recommendations Engine

The GreenTrace Recommendations Engine provides actionable, personalized steps for users to reduce their carbon footprint.

## Logic Flow
1. **Analyze Weaknesses:** The engine looks at the `CarbonScore` breakdown. Whichever category has the highest percentage becomes the primary target.
2. **Contextual Filtering:** Recommendations are filtered based on the user's current profile (e.g., don't recommend "Go Vegan" to someone who is already vegan).
3. **Impact Scoring:** Every recommendation is assigned an estimated `kgCo2Savings` value based on the Carbon Engine's emission factors.
4. **Difficulty Rating:** Recommendations are tiered (Easy, Medium, Hard) to allow users to ease into behavioral changes.

## Future Roadmap
- **2026:** Implement AI-driven dynamic recommendations based on localized weather and seasonal data.
- **2027:** Integrate with smart home APIs to suggest real-time energy usage optimizations.
- **2028:** Enterprise API to allow corporations to reward employees for completing recommendations.
