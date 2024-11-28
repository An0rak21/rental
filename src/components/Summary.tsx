import React from 'react';
import { TrendingUp, Wallet, Calculator, DollarSign } from 'lucide-react';
import { DigitalAsset } from '../types/types';
import { calculateTotalInvestment, calculateTotalProfits } from '../utils/calculations';
import { motion } from 'framer-motion';

interface SummaryProps {
  assets: DigitalAsset[];
}

export default function Summary({ assets }: SummaryProps) {
  const totalInvestment = calculateTotalInvestment(assets);
  const { netProfit, capitalGains, taxes } = calculateTotalProfits(assets);

  const cards = [
    {
      title: 'Total Investment',
      value: totalInvestment,
      icon: Wallet,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-500'
    },
    {
      title: 'Gross Profit',
      value: capitalGains,
      icon: DollarSign,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-500'
    },
    {
      title: 'Net Profit',
      value: netProfit,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-500'
    },
    {
      title: 'Estimated Taxes',
      value: taxes,
      icon: Calculator,
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative overflow-hidden rounded-xl border border-border bg-card p-6`}
        >
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${card.color}`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <card.icon className={`w-5 h-5 ${card.textColor}`} />
            </div>
            <p className={`mt-2 text-3xl font-bold ${card.textColor}`}>
              ${card.value.toFixed(2)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}