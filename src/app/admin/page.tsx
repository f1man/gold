import AdminClient from './AdminClient';
import { fetchOriginalGoldData } from '@/utils/goldApi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function AdminPage() {
  const originalData = await fetchOriginalGoldData();
  const baseValue = originalData[0] || null;

  return (
    <>
      <Header />
      <main>
        <AdminClient baseValue={baseValue} />
      </main>
      <Footer />
    </>
  );
}
