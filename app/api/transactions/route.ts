import { NextResponse } from 'next/server';

type CsvRow = Record<string, string>;

function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((value) => value.trim());
    return headers.reduce<CsvRow>((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('statement');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Upload a statement file with key "statement".' }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith('.csv')) {
    return NextResponse.json({ error: 'Current MVP supports CSV only. PDF parsing can be added in parser service.' }, { status: 400 });
  }

  const text = await file.text();
  const rows = parseCsv(text);

  return NextResponse.json({
    rows,
    count: rows.length,
    note: 'Demo parser complete. In production, normalize merchants/categories and persist to PostgreSQL.'
  });
}
