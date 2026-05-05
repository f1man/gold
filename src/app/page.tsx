import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PriceCards from '@/components/PriceCards';
import { fetchOriginalGoldData } from '@/utils/goldApi';

export const dynamic = 'force-dynamic';

const defaultSettings = {
  pure_buy: { type: '+원', value: 0 },
  pure_sell: { type: '+원', value: 0 },
  k18_buy: { type: '+원', value: 0 },
  k18_sell: { type: '+원', value: 0 },
  k14_buy: { type: '+원', value: 0 },
  k14_sell: { type: '+원', value: 0 },
  plat_buy: { type: '+원', value: 0 },
  plat_sell: { type: '+원', value: 0 },
  silver_buy: { type: '+원', value: 0 },
  silver_sell: { type: '+원', value: 0 }
};

async function getSettings() {
  const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed.k18_buy) return parsed;
    }
  } catch (e) {}
  return defaultSettings;
}

export function applyCorrection(dataList: any[], settings: any) {
  const categoryMap: Record<string, keyof typeof defaultSettings> = {
    s_pure: 'pure_buy',
    p_pure: 'pure_sell',
    s_18k: 'k18_buy',
    p_18k: 'k18_sell',
    s_14k: 'k14_buy',
    p_14k: 'k14_sell',
    s_white: 'plat_buy',
    p_white: 'plat_sell',
    s_silver: 'silver_buy',
    p_silver: 'silver_sell',
  };

  return dataList.map(item => {
    const newItem = { ...item };
    
    for (const key of Object.keys(categoryMap)) {
      if (typeof newItem[key] === 'number') {
        const category = categoryMap[key];
        const setting = settings[category] || { type: '+원', value: 0 };
        
        if (setting.value !== 0) {
          const { type, value } = setting;
          let result = newItem[key];
          
          if (type === '+원') result += value;
          else if (type === '-원') result -= value;
          else if (type === '+%') result += (result * (value / 100));
          else if (type === '-%') result -= (result * (value / 100));
          
          newItem[key] = Math.round(result);
        }
      }
    }
    return newItem;
  });
}

export default async function Home() {
  const originalData = await fetchOriginalGoldData();
  const settings = await getSettings();
  const data = applyCorrection(originalData, settings);

  const currentPrices = data[0] || {};
  let prevPrices = data[1] || {};

  if (currentPrices.date) {
    const currentDateStr = currentPrices.date.split(' ')[0];
    const prevDayItem = data.find((item: any) => {
      if (!item.date) return false;
      return item.date.split(' ')[0] !== currentDateStr;
    });
    if (prevDayItem) {
      prevPrices = prevDayItem;
    }
  }

  const refDate = currentPrices.date || '데이터 없음';

  return (
    <>
      <Header />
      <main className="container">
        {data && data.length > 0 ? (
          <div>
            <PriceCards current={currentPrices} previous={prevPrices} />
            <div style={{ marginTop: '1rem', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              기준일자: <strong>{refDate}</strong>
            </div>
          </div>
        ) : (
          <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
