import React, { useState } from 'react';
import { DigitalAsset, ChartView } from './types/types';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import Portfolio from './components/Portfolio';
import Summary from './components/Summary';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [assets, setAssets] = useLocalStorage<DigitalAsset[]>('crypto-assets', []);
  const [chartView, setChartView] = useState<ChartView>('assets');

  const handleAddAsset = (asset: DigitalAsset) => {
    setAssets([...assets, asset]);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  const handleUpdatePrice = (
    assetId: string,
    level: keyof DigitalAsset['takeProfitLevels'],
    price: number
  ) => {
    setAssets(assets.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          takeProfitLevels: {
            ...asset.takeProfitLevels,
            [level]: {
              ...asset.takeProfitLevels[level],
              price
            }
          }
        };
      }
      return asset;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Crypto Portfolio Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track, analyze, and optimize your digital asset portfolio
          </p>
        </div>
        
        <Summary assets={assets} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2">
            <Portfolio
              assets={assets}
              view={chartView}
              onViewChange={setChartView}
            />
          </div>
          <div className="lg:order-1">
            <AssetForm onSubmit={handleAddAsset} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Asset Management</h2>
          <AssetList
            assets={assets}
            onDelete={handleDeleteAsset}
            onUpdatePrice={handleUpdatePrice}
          />
        </div>
      </div>
    </div>
  );
}