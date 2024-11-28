import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { DigitalAsset, Narrative, AssetCategory } from '../types/types';
import { motion } from 'framer-motion';
import { narrativeTPPercentages } from '../utils/tpPercentages';

const narratives: Narrative[] = ['DeFi', 'Layer1', 'Layer2', 'GameFi', 'NFT', 'Metaverse', 'Web3'];
const categories: AssetCategory[] = ['HighRisk', 'Airdrop', 'MidCap', 'HighCap', 'BlueChips', 'Actions'];

interface TPInput {
  percentage: string;
  targetPrice: string;
}

interface AssetFormProps {
  onSubmit: (asset: DigitalAsset) => void;
}

export default function AssetForm({ onSubmit }: AssetFormProps) {
  const [formData, setFormData] = useState({
    symbol: '',
    narrative: 'DeFi' as Narrative,
    category: 'MidCap' as AssetCategory,
    entryPrice: '',
    quantity: '',
    tp1: { percentage: '', targetPrice: '' } as TPInput,
    tp2: { percentage: '', targetPrice: '' } as TPInput,
    tp3: { percentage: '', targetPrice: '' } as TPInput,
    tp4: { percentage: '', targetPrice: '' } as TPInput,
    moonbagPercentage: '',
  });

  useEffect(() => {
    const percentages = narrativeTPPercentages[formData.category];
    setFormData(prev => ({
      ...prev,
      tp1: { ...prev.tp1, percentage: percentages.tp1.toString() },
      tp2: { ...prev.tp2, percentage: percentages.tp2.toString() },
      tp3: { ...prev.tp3, percentage: percentages.tp3.toString() },
      tp4: { ...prev.tp4, percentage: percentages.tp4.toString() },
      moonbagPercentage: percentages.moonbag.toString(),
    }));
  }, [formData.category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total percentage to validate
    const totalPercentage = [1, 2, 3, 4].reduce((sum, level) => 
      sum + Number(formData[`tp${level}` as keyof typeof formData].percentage), 0
    ) + Number(formData.moonbagPercentage);

    if (totalPercentage !== 100) {
      alert('Total percentage must equal 100%');
      return;
    }
    
    const asset: DigitalAsset = {
      id: crypto.randomUUID(),
      symbol: formData.symbol,
      narrative: formData.narrative,
      category: formData.category,
      entryPrice: Number(formData.entryPrice),
      quantity: Number(formData.quantity),
      takeProfitLevels: {
        tp1: {
          percentage: Number(formData.tp1.percentage),
          targetPrice: Number(formData.tp1.targetPrice),
          quantity: Number(formData.quantity) * (Number(formData.tp1.percentage) / 100),
          price: null
        },
        tp2: {
          percentage: Number(formData.tp2.percentage),
          targetPrice: Number(formData.tp2.targetPrice),
          quantity: Number(formData.quantity) * (Number(formData.tp2.percentage) / 100),
          price: null
        },
        tp3: {
          percentage: Number(formData.tp3.percentage),
          targetPrice: Number(formData.tp3.targetPrice),
          quantity: Number(formData.quantity) * (Number(formData.tp3.percentage) / 100),
          price: null
        },
        tp4: {
          percentage: Number(formData.tp4.percentage),
          targetPrice: Number(formData.tp4.targetPrice),
          quantity: Number(formData.quantity) * (Number(formData.tp4.percentage) / 100),
          price: null
        },
      },
      moonbagPercentage: Number(formData.moonbagPercentage),
    };

    onSubmit(asset);
    setFormData({
      symbol: '',
      narrative: 'DeFi',
      category: 'MidCap',
      entryPrice: '',
      quantity: '',
      tp1: { percentage: '', targetPrice: '' },
      tp2: { percentage: '', targetPrice: '' },
      tp3: { percentage: '', targetPrice: '' },
      tp4: { percentage: '', targetPrice: '' },
      moonbagPercentage: '',
    });
  };

  const updateTP = (level: string, field: keyof TPInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [level]: {
        ...prev[level as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-card p-6 rounded-lg shadow-xl border border-border"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">Add New Asset</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Symbol</label>
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as AssetCategory })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Narrative</label>
          <select
            value={formData.narrative}
            onChange={(e) => setFormData({ ...formData, narrative: e.target.value as Narrative })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {narratives.map((narrative) => (
              <option key={narrative} value={narrative}>{narrative}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Entry Price ($)</label>
          <input
            type="number"
            step="0.000001"
            value={formData.entryPrice}
            onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Quantity</label>
          <input
            type="number"
            step="0.000001"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        {[1, 2, 3, 4].map((level) => (
          <div key={level} className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">TP{level} Percentage (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData[`tp${level}` as keyof typeof formData].percentage}
                onChange={(e) => updateTP(`tp${level}`, 'percentage', e.target.value)}
                className="w-full px-3 py-2 bg-muted text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">TP{level} Target Price ($)</label>
              <input
                type="number"
                step="0.000001"
                value={formData[`tp${level}` as keyof typeof formData].targetPrice}
                onChange={(e) => updateTP(`tp${level}`, 'targetPrice', e.target.value)}
                className="w-full px-3 py-2 bg-muted text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>
          </div>
        ))}

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium text-primary">Moonbag Percentage (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.moonbagPercentage}
            onChange={(e) => setFormData({ ...formData, moonbagPercentage: e.target.value })}
            className="w-full px-3 py-2 bg-secondary text-primary rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="mt-6 flex items-center justify-center w-full px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Asset
      </motion.button>
    </motion.form>
  );
}