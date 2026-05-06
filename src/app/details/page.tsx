import fs from 'fs';
import path from 'path';
import DetailsClient from './DetailsClient';
import { fetchOriginalGoldData } from '@/utils/goldApi';
import { applyCorrection } from '@/app/page';

export const dynamic = 'force-dynamic';

async function getSettings() {
  const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      const parsed = JSON.parse(data);
      if (parsed.k18_buy) return parsed;
    }
  } catch (e) {}
  return {};
}

export default async function DetailsPage() {
  const originalData = await fetchOriginalGoldData();
  const settings = await getSettings();
  const data = applyCorrection(originalData, settings);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      {data && data.length > 0 ? (
        <DetailsClient initialData={data} />
      ) : (
        <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </div>
      )}
    </div>
  );
}
