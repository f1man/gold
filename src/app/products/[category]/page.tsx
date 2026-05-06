import { productsData } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  // Validate category
  if (!['goldbar', 'silverbar', 'coin'].includes(category)) {
    notFound();
  }

  const filteredProducts = productsData.filter((p) => p.category === category);

  const titles: Record<string, string> = {
    goldbar: '프리미엄 골드바',
    silverbar: '프리미엄 실버바',
    coin: '기념 금화 / 은화',
  };

  const descriptions: Record<string, string> = {
    goldbar: '한국금거래소의 공인된 품질, 변하지 않는 가치를 담은 순금 골드바 컬렉션입니다.',
    silverbar: '자산 다변화를 위한 탁월한 선택, 고순도 프레스 진공 실버바를 만나보세요.',
    coin: '예술적 가치와 희소성을 동시에 지닌 프리미엄 기념 주화 및 메달 컬렉션입니다.',
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{titles[category]}</h1>
        <p className={styles.description}>{descriptions[category]}</p>
      </div>
      
      <div className={styles.gridSection}>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
