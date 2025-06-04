/*
  # Initial Schema Setup for FinanceAI

  1. New Tables
    - users (managed by Supabase Auth)
    - transactions
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - date (timestamp)
      - name (text)
      - amount (numeric)
      - category (text)
      - type (text)
      - created_at (timestamp)
    - budgets
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - name (text)
      - amount (numeric)
      - spent (numeric)
      - category (text)
      - created_at (timestamp)
    - goals
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - name (text)
      - target (numeric)
      - current (numeric)
      - target_date (timestamp)
      - created_at (timestamp)
    - payments
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - name (text)
      - amount (numeric)
      - due_date (timestamp)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  amount numeric NOT NULL,
  category text NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_amount CHECK (amount != 0)
);

-- Create budgets table
CREATE TABLE budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  amount numeric NOT NULL,
  spent numeric NOT NULL DEFAULT 0,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT positive_amount CHECK (amount > 0),
  CONSTRAINT valid_spent CHECK (spent >= 0)
);

-- Create goals table
CREATE TABLE goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  target numeric NOT NULL,
  current numeric NOT NULL DEFAULT 0,
  target_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT positive_target CHECK (target > 0),
  CONSTRAINT valid_current CHECK (current >= 0)
);

-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  amount numeric NOT NULL,
  due_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('upcoming', 'due', 'overdue', 'paid')),
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own budgets"
  ON budgets
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own goals"
  ON goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own payments"
  ON payments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);