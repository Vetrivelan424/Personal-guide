export type Category = 'Needs' | 'Wants' | 'EMI' | 'Investment' | 'Family' | 'Health' | 'Travel';

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
};

export type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  targetMonth: string;
};

export type Debt = {
  id: string;
  lender: string;
  emi: number;
  balance: number;
  interestRate: number;
  tenureMonthsLeft: number;
};

export type DailyGuide = {
  caution: string;
  learning: string;
  habit: string;
  motivation: string;
};

export type RiskLevel = 'Low' | 'Medium';

export type InvestmentPlan = {
  risk: RiskLevel;
  sipReady: boolean;
  monthlySIP: number;
  allocation: {
    category: string;
    percent: number;
  }[];
  recommendation: string;
};
