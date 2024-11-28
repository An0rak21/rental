import React from 'react';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { DigitalAsset } from '../types/types';
import { calculateProfitForLevel } from '../utils/calculations';
import { motion } from 'framer-motion';

interface AssetListProps {
  assets: DigitalAsset[];
  onDelete: (id: string) => void;
  onUpdatePrice: (assetId: string, level: keyof DigitalAsset['takeProfitLevels'], price: number) => void;
}

export default function AssetList({ assets, onDelete, onUpdatePrice }: AssetListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Asset</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Category</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Narrative</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Entry</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Amount</th>
            {['TP1', 'TP2', 'TP3', 'TP4'].map(level => (
              <th key={level} className="px-6 py-4 text-left text-sm font-medium text-primary">{level}</th>
            ))}
            <th className="px-6 py-4 text-left text-sm font-medium text-primary">Moonbag</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-primary">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {assets.map((asset) => (
            <motion.tr
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="hover:bg-muted/50 transition-colors"
            >
              <td className="px-6 py-4">
                <span className="font-semibold text-primary">{asset.symbol}</span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{asset.category}</td>
              <td className="px-6 py-4 text-muted-foreground">{asset.narrative}</td>
              <td className="px-6 py-4 text-muted-foreground">${asset.entryPrice.toFixed(6)}</td>
              <td className="px-6 py-4 text-muted-foreground">{asset.quantity}</td>
              {Object.entries(asset.takeProfitLevels).map(([level, tp]) => (
                <td key={level} className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{tp.percentage}%</span>
                      <span className="text-xs text-muted-foreground">@${tp.targetPrice}</span>
                    </div>
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="Sale Price"
                      value={tp.price || ''}
                      onChange={(e) => onUpdatePrice(asset.id, level as keyof DigitalAsset['takeProfitLevels'], Number(e.target.value))}
                      className="w-full px-2 py-1 text-sm bg-secondary border border-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    {tp.price && calculateProfitForLevel(asset, tp) && (
                      <div className="flex items-center space-x-1">
                        {calculateProfitForLevel(asset, tp)!.netProfit >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs ${
                          calculateProfitForLevel(asset, tp)!.netProfit >= 0 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}>
                          ${calculateProfitForLevel(asset, tp)!.netProfit.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 text-muted-foreground">{asset.moonbagPercentage}%</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(asset.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}