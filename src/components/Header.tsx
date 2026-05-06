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
        <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
          <Gem className={styles.logoIcon} />
          <span className={styles.logoText}>JASMIN GOLD</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>시세조회</Link>
          <Link href="/details" className={`${styles.navLink} ${pathname === '/details' ? styles.active : ''}`}>세부조회</Link>
          <div className={styles.navItem}>
            <span className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}>
              쇼핑몰
            </span>
            <div className={styles.dropdown}>
              <Link href="/products/goldbar" className={pathname === '/products/goldbar' ? styles.activeDropdown : ''}>골드바</Link>
              <Link href="/products/silverbar" className={pathname === '/products/silverbar' ? styles.activeDropdown : ''}>실버바</Link>
              <Link href="/products/coin" className={pathname === '/products/coin' ? styles.activeDropdown : ''}>금화/은화</Link>
            </div>
          </div>
          <Link href="/inquiry" className={`${styles.navLink} ${pathname.startsWith('/inquiry') ? styles.active : ''}`}>상담문의</Link>
          <Link href="/bespoke" className={styles.navLink}>Bespoke (맞춤제작)</Link>
          <div className={styles.navItem}>
            <span className={`${styles.navLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}>
              관리자(Admin)
            </span>
            <div className={styles.dropdown}>
              <Link href="/admin" className={pathname === '/admin' ? styles.activeDropdown : ''}>단가조정</Link>
              <Link href="/admin/invoice" className={pathname === '/admin/invoice' ? styles.activeDropdown : ''}>계산서 발행</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
