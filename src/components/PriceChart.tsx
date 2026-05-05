import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format } from 'date-fns';

export type MaterialType = 'pure' | 'k18' | 'k14' | 'plat' | 'silver';

interface PriceChartProps {
  data: any[];
  material?: MaterialType;
}

const MATERIAL_MAP = {
  pure: { buy: 's_pure', sell: 'p_pure', label: '순금' },
  k18: { buy: 's_18k', sell: 'p_18k', label: '18K' },
  k14: { buy: 's_14k', sell: 'p_14k', label: '14K' },
  plat: { buy: 's_white', sell: 'p_white', label: '백금' },
  silver: { buy: 's_silver', sell: 'p_silver', label: '은' }
};

export default function PriceChart({ data, material = 'pure' }: PriceChartProps) {
  
  const currentMat = MATERIAL_MAP[material];
  const buyKey = `${currentMat.label} 살 때`;
  const sellKey = `${currentMat.label} 팔 때`;

  // Format data for chart
  const formattedData = data.map(item => {
    let displayDate = item.date;
    try {
      const d = new Date(item.date.replace(' ', 'T'));
      displayDate = format(d, 'MM/dd');
    } catch(e) {}

    return {
      name: displayDate,
      [buyKey]: item[currentMat.buy],
      [sellKey]: item[currentMat.sell],
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.2)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--text-muted)" 
          fontSize={12} 
          tickLine={false}
          axisLine={false}
          minTickGap={30}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          stroke="var(--text-muted)" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 10000).toFixed(0)}만`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--card-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)'
          }}
          itemStyle={{ fontWeight: 600 }}
          formatter={(value: any) => {
            const num = Number(value);
            return isNaN(num) ? [value, ''] : [`${num.toLocaleString('ko-KR')}원`, ''];
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line 
          type="monotone" 
          dataKey={buyKey}
          stroke="var(--up-color)" 
          strokeWidth={4}
          dot={false}
          activeDot={{ r: 8, strokeWidth: 0 }}
          animationDuration={2000}
          animationEasing="ease-in-out"
          isAnimationActive={true}
        />
        <Line 
          type="monotone" 
          dataKey={sellKey}
          stroke="var(--down-color)" 
          strokeWidth={4}
          dot={false}
          activeDot={{ r: 8, strokeWidth: 0 }}
          animationDuration={2000}
          animationEasing="ease-in-out"
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
