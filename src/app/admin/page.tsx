import AdminClient from './AdminClient';
import { fetchOriginalGoldData } from '@/utils/goldApi';

export default async function AdminPage() {
  const originalData = await fetchOriginalGoldData();
  const baseValue = originalData[0] || null;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <AdminClient baseValue={baseValue} />
    </div>
  );
}
