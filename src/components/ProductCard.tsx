import { Product } from '@/data/products';
import Image from 'next/image';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={`glass ${styles.card}`}>
      <div className={styles.imageContainer}>
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{product.name}</h3>
          <span className={styles.weight}>{product.weight}</span>
        </div>
        <div className={styles.footer}>
          <span className={styles.priceTag}>{product.priceTag}</span>
          <button className={styles.buyBtn}>상담 예약</button>
        </div>
      </div>
    </div>
  );
}
