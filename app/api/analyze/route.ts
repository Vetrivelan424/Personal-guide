import { generateInsight } from '@/lib/ai';
import { monthlyIncome, transactions } from '@/lib/mock-data';
import { Transaction } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    insight: generateInsight(transactions, monthlyIncome),
    generatedAt: new Date().toISOString(),
    provider: 'Gemini (primary) / Ollama fallback',
    disclaimer: 'Educational insights only. Not investment advice.'
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { income?: number; transactions?: Transaction[] };
  const income = payload.income ?? monthlyIncome;
  const txs = payload.transactions ?? transactions;

  return NextResponse.json({
    insight: generateInsight(txs, income),
    txCount: txs.length,
    generatedAt: new Date().toISOString()
  });
}
