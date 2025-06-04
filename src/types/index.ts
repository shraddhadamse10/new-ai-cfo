export interface Transaction {
  id: number;
  date: string;
  name: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  color: string;
}

export interface FinancialGoal {
  id: number;
  name: string;
  target: number;
  current: number;
  date: string;
  icon: React.ReactNode;
  color: string;
}

export interface UpcomingPayment {
  id: number;
  name: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
  status: 'upcoming' | 'due' | 'overdue';
}

export interface FinancialInsight {
  id: number;
  title: string;
  description: string;
  type: 'suggestion' | 'alert' | 'opportunity';
  icon: React.ReactNode;
}