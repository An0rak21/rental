import React from 'react';
import { PieChart, BarChart } from 'lucide-react';
import { DigitalAsset, ChartView } from '../types/types';
import { calculateTotalInvestment } from '../utils/calculations';
import { motion } from 'framer-motion';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PortfolioProps {
  assets: DigitalAsset[];
  view: ChartView;
  onViewChange: (view: ChartView) => void;
}

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#EC4899', '#6366F1', '#6B7280'
];

export default function Portfolio({ assets, view, onViewChange }: PortfolioProps) {
  const totalInvestment = calculateTotalInvestment(assets);

  const getChartData = () => {
    if (view === 'assets') {
      return assets.map(asset => ({
        name: asset.symbol,
        value: asset.entryPrice * asset.quantity
      }));
    } else {
      const narrativeData = assets.reduce((acc, asset) => {
        const value = asset.entryPrice * asset.quantity;
        acc[asset.narrative] = (acc[asset.narrative] || 0) + value;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(narrativeData).map(([name, value]) => ({
        name,
        value
      }));
    }
  };

  const chartData = getChartData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 rounded-xl border border-border"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Portfolio Distribution</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewChange('assets')}
            className={`px-4 py-2 rounded-md transition-colors ${
              view === 'assets' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart className="w-4 h-4" />
              <span>Assets</span>
            </div>
          </button>
          <button
            onClick={() => onViewChange('narrative')}
            className={`px-4 py-2 rounded-md transition-colors ${
              view === 'narrative' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <PieChart className="w-4 h-4" />
              <span>Narrative</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        <div className="w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toFixed(2)}`}
                contentStyle={{ background: 'rgba(17, 24, 39, 0.8)', border: 'none', borderRadius: '8px' }}
              />
            </RechartsChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col space-y-3">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}
              </span>
              <span className="text-sm font-medium text-primary">
                ${item.value.toFixed(2)} ({((item.value / totalInvestment) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}