import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>해당 카테고리의 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
