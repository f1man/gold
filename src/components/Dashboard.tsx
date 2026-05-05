'use client';

import { useState } from 'react';
import PriceCards from './PriceCards';
import PriceChart from './PriceChart';
import PriceTable from './PriceTable';
import styles from '../app/page.module.css';

export default function Dashboard({ initialData }: { initialData: any[] }) {
  const [range, setRange] = useState('3개월');

  // Filter data based on range
  // initialData is reversed (newest first). Let's work with it.
  // The chart might need oldest first.
  const chartData = [...initialData].reverse();
  
  let filteredData = chartData;
  const today = new Date();
  const filterDate = new Date();

  if (range === '1개월') filterDate.setMonth(today.getMonth() - 1);
  else if (range === '3개월') filterDate.setMonth(today.getMonth() - 3);
  else if (range === '6개월') filterDate.setMonth(today.getMonth() - 6);
  else if (range === '1년') filterDate.setFullYear(today.getFullYear() - 1);
  else filterDate.setFullYear(today.getFullYear() - 10); // '전체'

  if (range !== '전체') {
    filteredData = chartData.filter(item => new Date(item.date) >= filterDate);
  }

  // Current prices (newest data point)
  const currentPrices = initialData[0] || {};
  const prevPrices = initialData[1] || {};

  return (
    <div className={styles.dashboard}>
      <PriceCards current={currentPrices} previous={prevPrices} />
      
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2 className={styles.sectionTitle}>금 시세 동향</h2>
          <div className={styles.filters}>
            {['1개월', '3개월', '6개월', '1년'].map(r => (
              <button 
                key={r}
                className={`${styles.filterBtn} ${range === r ? styles.active : ''}`}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className={`glass ${styles.chartContainer}`}>
          <PriceChart data={filteredData} />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>일별 시세 내역</h2>
        <div className={`glass ${styles.tableContainer}`}>
          <PriceTable data={initialData} />
        </div>
      </div>
    </div>
  );
}
