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
          <h4>Jasmine Jewelry</h4>
          <p>프리미엄 파인 주얼리, 자스민 주얼리</p>
          <p className={styles.copyright}>&copy; 2026 Jasmine Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
