import { DailyGuide, Debt, InvestmentPlan, RiskLevel, Transaction } from '@/lib/types';

export function generateInsight(transactions: Transaction[], income: number): string {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const savingsRate = Math.max(((income - total) / income) * 100, 0);
  const emiRatio = (transactions.filter((tx) => tx.category === 'EMI').reduce((sum, tx) => sum + tx.amount, 0) / income) * 100;

  if (savingsRate >= 30 && emiRatio <= 20) {
    return `Excellent discipline this month. Savings rate is ${savingsRate.toFixed(1)}% and EMI ratio is ${emiRatio.toFixed(1)}%. Continue SIPs and prepay highest-interest debt.`;
  }

  if (savingsRate >= 20) {
    return `Good progress. Savings rate is ${savingsRate.toFixed(1)}%. Cap discretionary spends at 12% of income and send every bonus to debt closure.`;
  }

  return `Alert: Savings rate is ${savingsRate.toFixed(1)}%. Pause non-essential spending for 7 days and redirect freed cash to emergency fund + EMI prepayment.`;
}

export function createDailyGuide(): DailyGuide {
  return {
    caution: 'You are at 78% of your planned monthly budget. Avoid impulse purchases for the next 4 days.',
    learning: 'Complete one focused 30-minute backend learning session today.',
    habit: 'Log each transaction immediately to reduce end-of-month blind spots.',
    motivation: 'Consistency beats intensity; one disciplined month compounds into freedom.'
  };
}

export function simulateDebtClosure(debts: Debt[], extraPayment: number) {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalEmi = debts.reduce((sum, debt) => sum + debt.emi, 0);
  const adjustedMonths = Math.ceil(totalDebt / Math.max(totalEmi + extraPayment, 1));
  const baselineMonths = Math.max(...debts.map((debt) => debt.tenureMonthsLeft));

  return {
    baselineMonths,
    adjustedMonths,
    monthsSaved: Math.max(baselineMonths - adjustedMonths, 0)
  };
}

export function buildInvestmentPlan(monthlySurplus: number, risk: RiskLevel): InvestmentPlan {
  const sipReady = monthlySurplus >= 5000;
  const monthlySIP = sipReady ? Math.floor(monthlySurplus * 0.55) : 0;

  const allocation =
    risk === 'Low'
      ? [
          { category: 'Liquid / Overnight Funds', percent: 25 },
          { category: 'Large Cap Index Funds', percent: 50 },
          { category: 'Short Duration Debt Funds', percent: 25 }
        ]
      : [
          { category: 'Large Cap Index Funds', percent: 50 },
          { category: 'Flexi Cap Funds', percent: 30 },
          { category: 'Hybrid / Debt', percent: 20 }
        ];

  return {
    risk,
    sipReady,
    monthlySIP,
    allocation,
    recommendation: sipReady
      ? 'SIP can continue. Pause only if emergency buffer drops below 3 months of expenses.'
      : 'Not SIP-ready yet. Build emergency buffer first, then start SIP.'
  };
}
