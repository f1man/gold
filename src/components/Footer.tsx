'use client';

import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/bespoke') return null;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.info}>
          <h4>Korea Gold Exchange Tracker</h4>
          <p>이 웹사이트는 한국금거래소의 시세 데이터를 바탕으로 구현된 데모 페이지입니다.</p>
          <p className={styles.copyright}>&copy; 2026 Gold Price Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
