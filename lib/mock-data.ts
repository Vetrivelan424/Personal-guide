import { Debt, Goal, Transaction } from '@/lib/types';

export const monthlyIncome = 92000;

export const transactions: Transaction[] = [
  { id: 't1', date: '2026-02-01', description: 'Rent', category: 'Needs', amount: 20000 },
  { id: 't2', date: '2026-02-03', description: 'Groceries', category: 'Needs', amount: 6500 },
  { id: 't3', date: '2026-02-04', description: 'Bike EMI', category: 'EMI', amount: 4100 },
  { id: 't4', date: '2026-02-05', description: 'Parents transfer', category: 'Family', amount: 8000 },
  { id: 't5', date: '2026-02-09', description: 'SIP Nifty Index', category: 'Investment', amount: 6000 },
  { id: 't6', date: '2026-02-11', description: 'Dining & outings', category: 'Wants', amount: 3400 },
  { id: 't7', date: '2026-02-12', description: 'Medical', category: 'Health', amount: 2100 },
  { id: 't8', date: '2026-02-15', description: 'Cab + metro', category: 'Travel', amount: 1650 }
];

export const goals: Goal[] = [
  { id: 'g1', title: 'Marriage Fund', targetAmount: 700000, savedAmount: 190000, targetMonth: 'Dec 2027' },
  { id: 'g2', title: 'House Down Payment', targetAmount: 2200000, savedAmount: 425000, targetMonth: 'May 2030' },
  { id: 'g3', title: 'Emergency Fund (6 months)', targetAmount: 540000, savedAmount: 135000, targetMonth: 'Oct 2027' }
];

export const debts: Debt[] = [
  { id: 'd1', lender: 'HDFC Personal Loan', emi: 11750, balance: 284000, interestRate: 13.5, tenureMonthsLeft: 34 },
  { id: 'd2', lender: 'Bike Loan', emi: 4100, balance: 69000, interestRate: 10.3, tenureMonthsLeft: 19 }
];
