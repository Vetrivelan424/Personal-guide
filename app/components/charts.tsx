'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import { Transaction } from '@/lib/types';

type Props = {
  transactions: Transaction[];
};

const trendData = [
  { month: 'Oct', spend: 60200 },
  { month: 'Nov', spend: 55200 },
  { month: 'Dec', spend: 59000 },
  { month: 'Jan', spend: 56500 },
  { month: 'Feb', spend: 59750 }
];

const colors = ['#6366f1', '#f97316', '#ef4444', '#22c55e', '#14b8a6', '#f43f5e', '#a78bfa'];

export function ExpenseCharts({ transactions }: Props) {
  const pieData = useMemo(() => {
    const group = transactions.reduce<Record<string, number>>((acc, tx) => {
      acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
      return acc;
    }, {});

    return Object.entries(group).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <section className="panel-grid">
      <article className="panel">
        <h3>Category Mix</h3>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={95}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
      <article className="panel">
        <h3>Monthly Expense Trend</h3>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
              <Line type="monotone" dataKey="spend" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
