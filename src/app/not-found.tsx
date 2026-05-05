import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-dot-grid" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: 'var(--card)',
        border: '3px solid var(--foreground)',
        borderRadius: 'var(--radius-lg)',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: '12px 12px 0px var(--foreground)',
      }} className="animate-pop">
        <h1 style={{ fontSize: '4rem', marginBottom: '16px', color: 'var(--secondary)' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>迷路啦！页面不见了</h2>
        <p style={{ color: 'var(--muted-foreground)', marginBottom: '32px' }}>
          你想找的知识点可能还在太空中漂浮。
        </p>
        <Link href="/" className="back-btn">
          返回主页
        </Link>
      </div>
    </div>
  );
}
