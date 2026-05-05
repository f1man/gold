'use client';

import styles from './Header.module.css';
import { Gem } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

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
          <Link href="/admin" className={pathname === '/admin' ? styles.active : ''}>관리자(Admin)</Link>
        </nav>
      </div>
    </header>
  );
}
