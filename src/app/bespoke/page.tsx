'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BespokePage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeCursor, setActiveCursor] = useState(false);

  useEffect(() => {
    // Custom cursor logic
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX; 
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animationFrameId = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animRing);

    // Hover effects
    const interactables = document.querySelectorAll('button, a, .step');
    const handleMouseEnter = () => setActiveCursor(true);
    const handleMouseLeave = () => setActiveCursor(false);

    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
        }
      });
    }, { threshold: 0.12 });

    const reveals = document.querySelectorAll(`.${styles.reveal}`);
    reveals.forEach(el => observer.observe(el));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Custom Cursor */}
      <div className={styles.cursor} ref={cursorRef}></div>
      <div className={`${styles.cursorRing} ${activeCursor ? styles.ringActive : ''}`} ref={ringRef}></div>

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}></div>
          <span className={styles.logoText}>KOREA GOLD EXCHANGE</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">시세조회</Link>
          <Link href="/details">세부조회</Link>
          <div className={styles.navItem}>
            <span className={styles.navLink}>쇼핑몰</span>
            <div className={styles.dropdown}>
              <Link href="/products/goldbar">골드바</Link>
              <Link href="/products/silverbar">실버바</Link>
              <Link href="/products/coin">금화/은화</Link>
            </div>
          </div>
          <Link href="/bespoke" className={styles.active}>Bespoke</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroLines}>
          <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="350" stroke="#C9A96E" strokeWidth="0.5"/>
            <circle cx="400" cy="400" r="280" stroke="#C9A96E" strokeWidth="0.5"/>
            <circle cx="400" cy="400" r="200" stroke="#C9A96E" strokeWidth="0.5"/>
            <line x1="50" y1="400" x2="750" y2="400" stroke="#C9A96E" strokeWidth="0.5"/>
            <line x1="400" y1="50" x2="400" y2="750" stroke="#C9A96E" strokeWidth="0.5"/>
            <line x1="153" y1="153" x2="647" y2="647" stroke="#C9A96E" strokeWidth="0.5"/>
            <line x1="647" y1="153" x2="153" y2="647" stroke="#C9A96E" strokeWidth="0.5"/>
            <polygon points="400,80 680,240 680,560 400,720 120,560 120,240" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
            <rect x="260" y="260" width="280" height="280" stroke="#C9A96E" strokeWidth="0.3" transform="rotate(45 400 400)" fill="none"/>
          </svg>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>KOREA GOLD EXCHANGE — PRIVATE ATELIER</p>
          <div className={styles.ornamentLine}>
            <span></span>
            <i>SINCE 1995</i>
            <span></span>
          </div>
          <h1 className={styles.heroTitle}>Private<br/><em>Bespoke</em></h1>
          <p className={styles.heroSubtitle}>세상의 단 하나뿐인,<br/>오직 고객님만을 위한 마스터피스.</p>
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine}></div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.story}>
        <div className={styles.storyLeft}>
          <div className={styles.storyNumber}>01</div>
          <span className={`${styles.sectionTag} ${styles.reveal}`}>THE PHILOSOPHY</span>
          <h2 className={`${styles.storyTitle} ${styles.reveal} ${styles.revealDelay1}`}>기쁨과 감동의<br/>순간을 영원히<br/>조각합니다</h2>
          <div className={`${styles.goldRule} ${styles.reveal} ${styles.revealDelay2}`}></div>
          <p className={`${styles.storyBody} ${styles.reveal} ${styles.revealDelay2}`}>
            당신의 이야기, 당신의 취향, 그리고 당신이 꿈꾸는 완벽한 순간. 저희의 수석 장인들이 0.1mm의 디테일까지 놓치지 않고, 최고급 원석과 순금으로 당신만의 하이엔드 주얼리를 디자인합니다.
          </p>
          <p className={`${styles.storyBody} ${styles.reveal} ${styles.revealDelay3}`}>
            보석의 스케치부터 최종 세공까지, 모든 과정은 고객님과의 긴밀한 소통을 통해 프라이빗하게 진행됩니다.
          </p>
        </div>
        <div className={`${styles.storyRight} ${styles.reveal} ${styles.revealDelay2}`}>
          <div className={styles.decorativePanel}>
            <div className={styles.decorativeContent}>
              <div className={styles.decorativeDiamond}>◆</div>
              <p className={styles.decorativeTag}>CRAFTSMANSHIP</p>
              <p className={styles.decorativeTitle}>완벽한<br/>순금 세공</p>
              <div className={styles.decorativeLine}></div>
              <p className={styles.decorativeDesc}>PURE GOLD 999.9‰<br/>GIA Certified Gemstones<br/>Hand Engraved Signatures</p>
            </div>
            {/* Corner marks */}
            <div className={`${styles.cornerMark} ${styles.tl}`}></div>
            <div className={`${styles.cornerMark} ${styles.tr}`}></div>
            <div className={`${styles.cornerMark} ${styles.bl}`}></div>
            <div className={`${styles.cornerMark} ${styles.br}`}></div>
          </div>
          
          <div className={styles.floatingBadge}>
            <span className={styles.badgeTop}>30+<br/>YEARS</span>
            <div className={styles.badgeLine}></div>
            <span className={styles.badgeBottom}>HERITAGE</span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process}>
        <div className={styles.processInner}>
          <div className={styles.processHeader}>
            <span className={`${styles.sectionTag} ${styles.reveal}`} style={{ display: 'block', marginBottom: '1.5rem' }}>THE ATELIER PROCESS</span>
            <h2 className={`${styles.storyTitle} ${styles.reveal} ${styles.revealDelay1}`} style={{ fontSize: '2.8rem', textAlign: 'center' }}>
              완성까지의 여정
            </h2>
          </div>

          <div className={styles.processSteps}>
            <div className={`${styles.step} ${styles.reveal} ${styles.revealDelay1} step`}>
              <div className={styles.stepNum}><span>01</span></div>
              <p className={styles.stepTitle}>FIRST CONSULTATION</p>
              <p className={styles.stepDesc}>프라이빗 살롱에서<br/>고객님의 비전과<br/>스토리를 청취합니다</p>
            </div>
            <div className={`${styles.step} ${styles.reveal} ${styles.revealDelay2} step`}>
              <div className={styles.stepNum}><span>02</span></div>
              <p className={styles.stepTitle}>DESIGN ATELIER</p>
              <p className={styles.stepDesc}>수석 디자이너가<br/>3D 스케치와 렌더링으로<br/>디자인을 구체화합니다</p>
            </div>
            <div className={`${styles.step} ${styles.reveal} ${styles.revealDelay3} step`}>
              <div className={styles.stepNum}><span>03</span></div>
              <p className={styles.stepTitle}>MASTER CRAFT</p>
              <p className={styles.stepDesc}>GIA 공인 원석과<br/>24K 순금으로<br/>장인이 직접 제작합니다</p>
            </div>
            <div className={`${styles.step} ${styles.reveal} ${styles.revealDelay4} step`}>
              <div className={styles.stepNum}><span>04</span></div>
              <p className={styles.stepTitle}>PRIVATE DELIVERY</p>
              <p className={styles.stepDesc}>보증서와 함께<br/>단독 프레젠테이션으로<br/>완성작을 전달합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteBg}></div>
        <span className={styles.quoteMark}>&quot;</span>
        <blockquote className={styles.reveal}>
          <p>완성된 작품은 단순한 장신구를 넘어,<br/>대를 이어 물려줄 수 있는<br/>가문(家門)의 유산이 될 것입니다.</p>
          <cite>— KOREA GOLD EXCHANGE, MASTER ATELIER</cite>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaBox} ${styles.reveal}`}>
          <div className={`${styles.corner} ${styles.ctl}`}></div>
          <div className={`${styles.corner} ${styles.ctr}`}></div>
          <div className={`${styles.corner} ${styles.cbl}`}></div>
          <div className={`${styles.corner} ${styles.cbr}`}></div>

          <span className={styles.ctaEyebrow}>EXCLUSIVE ACCESS</span>
          <h2 className={styles.ctaTitle}>V.I.P 상담 예약</h2>
          <div className={styles.goldRule} style={{ margin: '0 auto 2rem' }}></div>
          <p className={styles.ctaDesc}>
            모든 상담은 철저히 비공개로 진행됩니다.<br/>
            고객님만을 위한 프라이빗 살롱 예약을 위해 연락 주십시오.
          </p>
          <button className={styles.btnVip}><span>VIP 상담 예약하기</span></button>
          <button className={styles.btnOutline}>포트폴리오 열람</button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>KOREA GOLD EXCHANGE</div>
        <div className={styles.footerCopy}>© 2026 Gold Price Tracker. All rights reserved.</div>
        <div className={styles.footerNote}>이 웹사이트는 한국금거래소의 시세 데이터를 바탕으로 구현된 데모 페이지입니다.</div>
      </footer>
    </div>
  );
}
