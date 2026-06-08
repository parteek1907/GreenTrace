-- GreenTrace Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ═══════════════════════════════════════
-- Profiles (extends Supabase Auth users)
-- ═══════════════════════════════════════
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ═══════════════════════════════════════
-- Carbon Assessments
-- ═══════════════════════════════════════
CREATE TABLE carbon_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  -- Transport
  car_km_weekly NUMERIC DEFAULT 0,
  car_type TEXT DEFAULT 'petrol' CHECK (car_type IN ('petrol', 'diesel', 'hybrid', 'electric')),
  public_transport_km_weekly NUMERIC DEFAULT 0,
  flights_per_year INTEGER DEFAULT 0,
  -- Diet
  diet_type TEXT DEFAULT 'mixed' CHECK (diet_type IN ('vegan', 'vegetarian', 'pescatarian', 'mixed', 'heavy_meat')),
  local_food_pct INTEGER DEFAULT 50 CHECK (local_food_pct BETWEEN 0 AND 100),
  -- Energy
  electricity_kwh_monthly NUMERIC DEFAULT 0,
  renewable_pct INTEGER DEFAULT 0 CHECK (renewable_pct BETWEEN 0 AND 100),
  heating_type TEXT DEFAULT 'gas' CHECK (heating_type IN ('gas', 'electric', 'heat_pump', 'solar')),
  -- Shopping
  clothing_items_monthly INTEGER DEFAULT 2,
  electronics_yearly INTEGER DEFAULT 1,
  secondhand_pct INTEGER DEFAULT 0 CHECK (secondhand_pct BETWEEN 0 AND 100),
  -- Household
  household_size INTEGER DEFAULT 2 CHECK (household_size > 0),
  home_sqm NUMERIC DEFAULT 80 CHECK (home_sqm > 0),
  recycling_pct INTEGER DEFAULT 50 CHECK (recycling_pct BETWEEN 0 AND 100),
  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_carbon_assessments_user ON carbon_assessments(user_id);

-- ═══════════════════════════════════════
-- Carbon Scores
-- ═══════════════════════════════════════
CREATE TABLE carbon_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assessment_id UUID REFERENCES carbon_assessments(id),
  total_kg_co2_yearly NUMERIC NOT NULL,
  transport_kg NUMERIC NOT NULL,
  food_kg NUMERIC NOT NULL,
  energy_kg NUMERIC NOT NULL,
  shopping_kg NUMERIC NOT NULL,
  waste_kg NUMERIC NOT NULL,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  grade TEXT NOT NULL,
  percentile INTEGER CHECK (percentile BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_carbon_scores_user ON carbon_scores(user_id);

-- ═══════════════════════════════════════
-- Recommendations
-- ═══════════════════════════════════════
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_kg_co2 NUMERIC NOT NULL,
  impact_pct NUMERIC NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  is_completed BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recommendations_user ON recommendations(user_id);

-- ═══════════════════════════════════════
-- Challenges (system-defined)
-- ═══════════════════════════════════════
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  target_reduction_pct NUMERIC NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed challenges
INSERT INTO challenges (title, description, category, duration_days, target_reduction_pct, badge_name, badge_icon) VALUES
('No Car Week', 'Avoid driving for 7 days. Walk, bike, or take public transport.', 'transport', 7, 15, 'Road Warrior', '🚶'),
('Vegetarian Week', 'Go fully vegetarian for 7 days.', 'food', 7, 10, 'Leaf Lover', '🥬'),
('Green Commute', 'Use only public transport or cycling for 14 days.', 'transport', 14, 20, 'Green Commuter', '🚲'),
('Energy Saver', 'Reduce electricity usage by 20% for 30 days.', 'energy', 30, 8, 'Power Down', '💡'),
('Zero Waste Week', 'Minimize waste — recycle, compost, and avoid single-use plastics.', 'waste', 7, 5, 'Waste Warrior', '♻️'),
('Local Food Month', 'Buy only locally sourced food for 30 days.', 'food', 30, 12, 'Local Hero', '🌾');

-- ═══════════════════════════════════════
-- Challenge Progress
-- ═══════════════════════════════════════
CREATE TABLE challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id UUID REFERENCES challenges(id) NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress_pct NUMERIC DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  daily_logs JSONB DEFAULT '[]'
);

CREATE INDEX idx_challenge_progress_user ON challenge_progress(user_id);

-- ═══════════════════════════════════════
-- Simulation History
-- ═══════════════════════════════════════
CREATE TABLE simulation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  parameters JSONB NOT NULL,
  baseline_kg NUMERIC NOT NULL,
  simulated_kg NUMERIC NOT NULL,
  reduction_kg NUMERIC NOT NULL,
  reduction_pct NUMERIC NOT NULL,
  equivalents JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_simulation_history_user ON simulation_history(user_id);

-- ═══════════════════════════════════════
-- Activity Logs
-- ═══════════════════════════════════════
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

-- ═══════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own assessments" ON carbon_assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assessments" ON carbon_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own scores" ON carbon_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON carbon_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own recommendations" ON recommendations FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view challenges" ON challenges FOR SELECT USING (true);

CREATE POLICY "Users can manage own challenge progress" ON challenge_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own simulations" ON simulation_history FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own activity logs" ON activity_logs FOR ALL USING (auth.uid() = user_id);
