'use client';

import { useState } from 'react';
import PriceChart, { MaterialType } from '@/components/PriceChart';
import PriceTable from '@/components/PriceTable';
import styles from '@/app/page.module.css';

interface DetailsClientProps {
  initialData: any[];
}

export default function DetailsClient({ initialData }: DetailsClientProps) {
  const [range, setRange] = useState('3개월');
  const [material, setMaterial] = useState<MaterialType>('pure');

  // Filter data based on range
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
    filteredData = chartData.filter(item => new Date(item.date.replace(' ', 'T')) >= filterDate);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>세부조회 차트</h2>
            <select 
              value={material} 
              onChange={(e) => setMaterial(e.target.value as MaterialType)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                background: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '1rem',
                outline: 'none',
                fontWeight: 600
              }}
            >
              <option value="pure">순금</option>
              <option value="k18">18K</option>
              <option value="k14">14K</option>
              <option value="plat">백금</option>
              <option value="silver">은</option>
            </select>
          </div>
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
          <PriceChart data={filteredData} material={material} />
        </div>
      </div>

      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>일별 시세 상세 내역</h2>
        <div className={`glass ${styles.tableContainer}`}>
          <PriceTable data={initialData} material={material} />
        </div>
      </div>
    </div>
  );
}
