export interface Product {
  id: string;
  name: string;
  weight: string;
  category: 'goldbar' | 'silverbar' | 'coin';
  image: string;
  priceTag: string; // Fake static price or dynamic description
}

export const productsData: Product[] = [
  // Gold Bar
  { id: 'g1', name: '순금 골드바', weight: '3.75g (1돈)', category: 'goldbar', image: '/images/gold_bar.png', priceTag: '시세 적용' },
  { id: 'g2', name: '순금 골드바', weight: '10g', category: 'goldbar', image: '/images/gold_bar.png', priceTag: '시세 적용' },
  { id: 'g3', name: '순금 골드바', weight: '37.5g (10돈)', category: 'goldbar', image: '/images/gold_bar.png', priceTag: '시세 적용' },
  { id: 'g4', name: '순금 골드바', weight: '100g', category: 'goldbar', image: '/images/gold_bar.png', priceTag: '시세 적용' },
  { id: 'g5', name: '순금 프레스 골드바', weight: '1000g (1kg)', category: 'goldbar', image: '/images/gold_bar.png', priceTag: '시세 적용' },
  
  // Silver Bar
  { id: 's1', name: '순은 실버바', weight: '100g', category: 'silverbar', image: '/images/silver_bar.png', priceTag: '시세 적용' },
  { id: 's2', name: '순은 실버바', weight: '500g', category: 'silverbar', image: '/images/silver_bar.png', priceTag: '시세 적용' },
  { id: 's3', name: '프레스 진공 실버바', weight: '1000g (1kg)', category: 'silverbar', image: '/images/silver_bar.png', priceTag: '시세 적용' },
  { id: 's4', name: '인베스트 실버바 (Box)', weight: '1000g x 10ea', category: 'silverbar', image: '/images/silver_bar.png', priceTag: '시세 적용' },
  
  // Coin
  { id: 'c1', name: '아메리칸 이글 골드 코인', weight: '1 oz', category: 'coin', image: '/images/gold_coin.png', priceTag: '프리미엄 한정판' },
  { id: 'c2', name: '황도 12성좌 골드 메달', weight: '1 oz', category: 'coin', image: '/images/gold_coin.png', priceTag: '기념 주화' },
  { id: 'c3', name: '대한민국 독도 실버 메달', weight: '1 oz', category: 'coin', image: '/images/gold_coin.png', priceTag: '기념 주화' },
  { id: 'c4', name: '순금 거북이 주화', weight: '3.75g (1돈)', category: 'coin', image: '/images/gold_coin.png', priceTag: '시세 적용' },
];
