'use client';

import styles from './Header.module.css';
import { Gem } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/bespoke') return null;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <Gem className={styles.logoIcon} />
          <span className={styles.logoText}>KOREA GOLD X</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={pathname === '/' ? styles.active : ''}>시세조회</Link>
          <Link href="/details" className={pathname === '/details' ? styles.active : ''}>세부조회</Link>
          <Link href="/products/goldbar" className={pathname === '/products/goldbar' ? styles.active : ''}>골드바</Link>
          <Link href="/products/silverbar" className={pathname === '/products/silverbar' ? styles.active : ''}>실버바</Link>
          <Link href="/products/coin" className={pathname === '/products/coin' ? styles.active : ''}>금화/은화</Link>
          <Link href="/bespoke" className={pathname === '/bespoke' ? styles.active : ''}>Bespoke (맞춤제작)</Link>
          <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>관리자(Admin)</Link>
        </nav>
      </div>
    </header>
  );
}
