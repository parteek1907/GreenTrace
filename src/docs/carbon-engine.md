# Carbon Engine Methodology

The Carbon Engine is the core calculation unit of GreenTrace. It translates user behavior into standardized CO2e (Carbon Dioxide Equivalent) metrics.

## Calculation Logic
The engine aggregates emissions across five main categories:
1. **Transport:** Evaluates vehicle type, public transit usage, and flights.
2. **Food:** Assesses dietary preferences (vegan, vegetarian, omnivore) and local sourcing.
3. **Energy:** Analyzes home energy source (renewable vs. grid) and consumption efficiency.
4. **Shopping:** Estimates footprint from consumer habits and fast-fashion frequency.
5. **Waste:** Calculates impact based on recycling and composting rates.

## Emission Factors
Emission factors are derived from global standards (e.g., EPA, IPCC guidelines).
- Average Car: `0.4 kg CO2e / mile`
- Beef-heavy Diet: `~3.3 kg CO2e / day`
- Vegan Diet: `~1.5 kg CO2e / day`
- Grid Electricity: `~0.85 lbs CO2e / kWh`

## Scoring Formula
The baseline score is normalized to 100.
```text
Raw Output = Sum(Categories) in kg CO2e / year
National Average = ~14,000 kg CO2e / year

Score = Max(0, 100 - ((Raw Output / National Average) * 50))
Percentile = Calculated against normalized user distribution curves.
```

## The Carbon Twin
The Carbon Twin uses a delta-calculation method. When a user toggles a "Simulation", the engine:
1. Clones the current profile.
2. Applies the selected parameter change (e.g., `Diet -> Vegan`).
3. Re-runs the `computeScore` pipeline.
4. Returns the exact delta (e.g., `-1,200 kg CO2e`).
