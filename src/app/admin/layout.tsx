'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Do not show admin tabs if we are trying to print, 
  // but we can just handle hiding it via print CSS.
  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <div className="admin-tabs" style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 2rem 0' }}>
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '1rem' }}>
          <Link 
            href="/admin" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              fontWeight: 600,
              backgroundColor: pathname === '/admin' ? 'var(--primary)' : 'transparent',
              color: pathname === '/admin' ? 'white' : 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            단가조정
          </Link>
          <Link 
            href="/admin/invoice" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              fontWeight: 600,
              backgroundColor: pathname === '/admin/invoice' ? 'var(--primary)' : 'transparent',
              color: pathname === '/admin/invoice' ? 'white' : 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            계산서(영수증) 발행
          </Link>
        </div>
      </div>
      
      {/* 
        For the invoice page to work seamlessly, we will add a global print style to hide the tabs.
      */}
      <style jsx global>{`
        @media print {
          .admin-tabs { display: none !important; }
          header { display: none !important; }
          footer { display: none !important; }
        }
      `}</style>
      
      {children}
    </div>
  );
}
