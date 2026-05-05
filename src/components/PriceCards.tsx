import styles from './PriceCards.module.css';

interface PriceCardsProps {
  current: any;
  previous: any;
}

export default function PriceCards({ current, previous }: PriceCardsProps) {
  
  const formatPrice = (price: number) => {
    return price ? price.toLocaleString('ko-KR') + '원' : '-';
  };

  const getDiff = (curr: number, prev: number) => {
    if (!curr || !prev) return { val: 0, str: '-' };
    const diff = curr - prev;
    return {
      val: diff,
      str: diff > 0 ? `▲ ${diff.toLocaleString('ko-KR')}` : diff < 0 ? `▼ ${Math.abs(diff).toLocaleString('ko-KR')}` : '-',
      className: diff > 0 ? 'text-up' : diff < 0 ? 'text-down' : 'text-neutral'
    };
  };

  const renderCard = (title: string, buyKey: string, sellKey: string, isGold = false) => {
    const diffBuy = getDiff(current[buyKey], previous[buyKey]);
    const diffSell = getDiff(current[sellKey], previous[sellKey]);

    return (
      <div className={`glass ${styles.card} ${isGold ? styles.goldCard : ''}`}>
        <div className={styles.cardHeader}>
          <h3>{title}</h3>
          {isGold && <span className={styles.badge}>가장 많이 찾는</span>}
        </div>
        
        <div className={styles.prices}>
          <div className={styles.priceRow}>
            <span className={styles.label}>내가 살 때</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{formatPrice(current[buyKey])}</span>
              <span className={`${styles.diff} ${diffBuy.className}`}>{diffBuy.str}</span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.priceRow}>
            <span className={styles.label}>내가 팔 때</span>
            <div className={styles.valueGroup}>
              <span className={styles.value}>{formatPrice(current[sellKey])}</span>
              <span className={`${styles.diff} ${diffSell.className}`}>{diffSell.str}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.grid}>
      {renderCard('순금 24K (3.75g)', 's_pure', 'p_pure', true)}
      {renderCard('18K (3.75g)', 's_18k', 'p_18k')}
      {renderCard('14K (3.75g)', 's_14k', 'p_14k')}
      {renderCard('백금 (3.75g)', 's_white', 'p_white')}
      {renderCard('은 (3.75g)', 's_silver', 'p_silver')}
    </div>
  );
}
