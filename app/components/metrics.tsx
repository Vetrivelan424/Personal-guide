import { ReactNode } from 'react';

type MetricProps = {
  title: string;
  value: string;
  subtitle: string;
  tone?: 'default' | 'good' | 'warn';
  icon: ReactNode;
};

export function MetricCard({ title, value, subtitle, icon, tone = 'default' }: MetricProps) {
  return (
    <article className={`metric-card ${tone}`}>
      <div>
        <p className="metric-title">{title}</p>
        <h3>{value}</h3>
        <p className="metric-subtitle">{subtitle}</p>
      </div>
      <span className="metric-icon" aria-hidden>
        {icon}
      </span>
    </article>
  );
}
