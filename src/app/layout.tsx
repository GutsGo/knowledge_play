import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '知识清单 | Knowledge Base',
  description: '前端知识梳理与沉淀',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <nav style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(255, 253, 245, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px solid var(--border)',
          padding: '16px 0'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '1.4rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--accent)',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--foreground)',
                boxShadow: '3px 3px 0px var(--foreground)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem'
              }}>K</div>
              Knowledge Play
            </Link>
            <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
              <li>
                <Link href="/" style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: '2px solid transparent',
                }}>首页</Link>
              </li>
            </ul>
          </div>
        </nav>
        <main style={{ paddingTop: '110px', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
