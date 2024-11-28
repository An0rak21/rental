export type Narrative = 'DeFi' | 'Layer1' | 'Layer2' | 'GameFi' | 'NFT' | 'Metaverse' | 'Web3';
export type AssetCategory = 'HighRisk' | 'Airdrop' | 'MidCap' | 'HighCap' | 'BlueChips' | 'Actions';

export interface TakeProfitLevel {
  percentage: number;
  targetPrice: number;
  quantity: number;
  price: number | null;
}

export interface DigitalAsset {
  id: string;
  symbol: string;
  narrative: Narrative;
  category: AssetCategory;
  entryPrice: number;
  quantity: number;
  takeProfitLevels: {
    tp1: TakeProfitLevel;
    tp2: TakeProfitLevel;
    tp3: TakeProfitLevel;
    tp4: TakeProfitLevel;
  };
  moonbagPercentage: number;
}

export interface ProfitCalculation {
  netProfit: number;
  capitalGains: number;
  taxes: number;
}

export type ChartView = 'assets' | 'narrative';