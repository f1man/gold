import Image from 'next/image';
import styles from './page.module.css';

export default function BespokePage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/bespoke.png" 
            alt="Private Bespoke Jewelry" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.overlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Private Bespoke</h1>
          <p className={styles.subtitle}>
            세상의 단 하나뿐인, 오직 고객님만을 위한 마스터피스.
          </p>
        </div>
      </div>

      <div className={styles.storySection}>
        <div className={styles.glassPanel}>
          <h2 className={styles.storyTitle}>기쁨과 감동의 순간을 영원히 조각합니다</h2>
          <div className={styles.divider}></div>
          <p className={styles.storyText}>
            당신의 이야기, 당신의 취향, 그리고 당신이 꿈꾸는 완벽한 순간.<br />
            저희의 수석 장인들이 0.1mm의 디테일까지 놓치지 않고, 최고급 원석과 순금으로 
            당신만의 하이엔드 주얼리를 디자인합니다.
          </p>
          <p className={styles.storyText}>
            보석의 스케치부터 최종 세공까지, 모든 과정은 고객님과의 긴밀한 소통을 통해 
            프라이빗하게 진행되며, 완성된 작품은 단순한 장신구를 넘어 
            대를 이어 물려줄 수 있는 가문(家門)의 유산이 될 것입니다.
          </p>
          
          <button className={styles.contactBtn}>V.I.P 상담 예약하기</button>
        </div>
      </div>
    </div>
  );
}
