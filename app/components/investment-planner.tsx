'use client';

import { useMemo, useState } from 'react';
import { buildInvestmentPlan } from '@/lib/ai';
import { RiskLevel } from '@/lib/types';

type Props = {
  monthlySurplus: number;
};

export function InvestmentPlanner({ monthlySurplus }: Props) {
  const [risk, setRisk] = useState<RiskLevel>('Low');
  const plan = useMemo(() => buildInvestmentPlan(monthlySurplus, risk), [monthlySurplus, risk]);

  return (
    <article className="panel">
      <div className="panel-title-row">
        <h3>Investment Planner (India-safe)</h3>
        <select value={risk} onChange={(event) => setRisk(event.target.value as RiskLevel)}>
          <option value="Low">Low Risk</option>
          <option value="Medium">Medium Risk</option>
        </select>
      </div>
      <p className="muted">SIP readiness evaluates surplus and cash-flow safety before investing.</p>
      <p><strong>Status:</strong> {plan.sipReady ? 'SIP Ready ✅' : 'Pause SIP ⚠️'}</p>
      <p><strong>Suggested SIP:</strong> ₹{plan.monthlySIP.toLocaleString('en-IN')} / month</p>
      <ul>
        {plan.allocation.map((item) => (
          <li key={item.category}>{item.category}: {item.percent}%</li>
        ))}
      </ul>
      <p className="muted">{plan.recommendation}</p>
      <p className="disclaimer">Disclaimer: No individual stock recommendations are provided.</p>
    </article>
  );
}
