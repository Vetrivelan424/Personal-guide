import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LifeOS',
  description: 'Personal life-planning and financial management for Indian professionals'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
