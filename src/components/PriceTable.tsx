import { MaterialType } from './PriceChart';
import styles from './PriceTable.module.css';
import { format } from 'date-fns';

interface PriceTableProps {
  data: any[];
  material?: MaterialType;
}

const MATERIAL_MAP = {
  pure: { buy: 's_pure', sell: 'p_pure', label: '순금' },
  k18: { buy: 's_18k', sell: 'p_18k', label: '18K' },
  k14: { buy: 's_14k', sell: 'p_14k', label: '14K' },
  plat: { buy: 's_white', sell: 'p_white', label: '백금' },
  silver: { buy: 's_silver', sell: 'p_silver', label: '은' }
};

export default function PriceTable({ data, material = 'pure' }: PriceTableProps) {
  const formatPrice = (price: number) => {
    return price ? price.toLocaleString('ko-KR') : '-';
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr.replace(' ', 'T'));
      return format(d, 'yyyy.MM.dd HH:mm');
    } catch {
      return dateStr;
    }
  };

  const currentMat = MATERIAL_MAP[material];

  // Only show the last 30 entries for the table for performance/simplicity
  const displayData = data.slice(0, 30);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>고시일시</th>
          <th>{currentMat.label} 살 때</th>
          <th>{currentMat.label} 팔 때</th>
        </tr>
      </thead>
      <tbody>
        {displayData.map((item, index) => (
          <tr key={index}>
            <td className={styles.dateCol}>{formatDate(item.date)}</td>
            <td className={styles.upCol}>{formatPrice(item[currentMat.buy])}</td>
            <td className={styles.downCol}>{formatPrice(item[currentMat.sell])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
