import { ExpenseCharts } from '@/app/components/charts';
import { InvestmentPlanner } from '@/app/components/investment-planner';
import { MetricCard } from '@/app/components/metrics';
import { StatementUpload } from '@/app/components/statement-upload';
import { createDailyGuide, generateInsight, simulateDebtClosure } from '@/lib/ai';
import { debts, goals, monthlyIncome, transactions } from '@/lib/mock-data';

export default function Home() {
  const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const savings = monthlyIncome - totalSpent;
  const debtBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const debtSimulation = simulateDebtClosure(debts, 3500);
  const insight = generateInsight(transactions, monthlyIncome);
  const guide = createDailyGuide();

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="tag">LifeOS • Monolithic Finance Planner</p>
          <h1>Plan money, debt, goals, and daily growth in one clear operating system.</h1>
          <p className="lead">
            Built for Indian working professionals to improve visibility, reduce debt pressure, and make safe long-term investment decisions.
          </p>
        </div>
      </header>

      <section className="metrics-grid">
        <MetricCard title="Monthly Income" value={`₹${monthlyIncome.toLocaleString('en-IN')}`} subtitle="Take-home salary" icon="💼" />
        <MetricCard title="Spent" value={`₹${totalSpent.toLocaleString('en-IN')}`} subtitle="Current month" tone="warn" icon="💳" />
        <MetricCard title="Savings Left" value={`₹${savings.toLocaleString('en-IN')}`} subtitle="Available for goals" tone="good" icon="🌱" />
        <MetricCard title="Debt Outstanding" value={`₹${debtBalance.toLocaleString('en-IN')}`} subtitle="All active loans" tone="warn" icon="📉" />
      </section>

      <section className="panel-grid">
        <StatementUpload />
        <article className="panel">
          <h3>AI Monthly Insight</h3>
          <p>{insight}</p>
          <p className="muted">
            Debt acceleration simulation: paying ₹3,500 extra monthly may save <strong>{debtSimulation.monthsSaved} months</strong>.
          </p>
        </article>
      </section>

      <ExpenseCharts transactions={transactions} />

      <section className="panel-grid">
        <article className="panel">
          <h3>AI Daily Routine Guide</h3>
          <ul>
            <li><strong>Spending caution:</strong> {guide.caution}</li>
            <li><strong>Career learning:</strong> {guide.learning}</li>
            <li><strong>Habit reminder:</strong> {guide.habit}</li>
            <li><strong>Motivation:</strong> {guide.motivation}</li>
          </ul>
        </article>
        <InvestmentPlanner monthlySurplus={savings} />
      </section>

      <section className="panel-grid">
        <article className="panel">
          <h3>Debt Payoff Tracker</h3>
          <table>
            <thead>
              <tr>
                <th>Lender</th>
                <th>EMI</th>
                <th>Balance</th>
                <th>ROI</th>
                <th>Months Left</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => (
                <tr key={debt.id}>
                  <td>{debt.lender}</td>
                  <td>₹{debt.emi.toLocaleString('en-IN')}</td>
                  <td>₹{debt.balance.toLocaleString('en-IN')}</td>
                  <td>{debt.interestRate}%</td>
                  <td>{debt.tenureMonthsLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <article className="panel">
          <h3>Goal Planner</h3>
          {goals.map((goal) => {
            const progress = Math.round((goal.savedAmount / goal.targetAmount) * 100);
            const remaining = goal.targetAmount - goal.savedAmount;
            const monthlyRequired = Math.ceil(remaining / 24);

            return (
              <div key={goal.id} className="goal-row">
                <div>
                  <p>{goal.title}</p>
                  <small>
                    ₹{goal.savedAmount.toLocaleString('en-IN')} / ₹{goal.targetAmount.toLocaleString('en-IN')} • {goal.targetMonth}
                  </small>
                </div>
                <div className="progress-shell">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <small className="muted">Required monthly contribution: ₹{monthlyRequired.toLocaleString('en-IN')}</small>
                <strong>{progress}%</strong>
              </div>
            );
          })}
        </article>
      </section>
    </main>
  );
}
