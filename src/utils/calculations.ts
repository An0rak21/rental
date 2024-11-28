import { DigitalAsset, ProfitCalculation, TakeProfitLevel } from '../types/types';

const TAX_RATE = 0.30; // 30% tax rate (17.2% social charges + 12.8% income tax)

export const calculateProfitForLevel = (
  asset: DigitalAsset,
  level: TakeProfitLevel
): ProfitCalculation | null => {
  if (!level.price) return null;
  
  // Calculate the proportional cost basis for the sold quantity
  const soldQuantity = level.quantity;
  const proportionalCostBasis = (soldQuantity / asset.quantity) * (asset.entryPrice * asset.quantity);
  
  // Calculate revenue from the sale
  const revenue = level.price * soldQuantity;
  
  // Calculate capital gains
  const capitalGains = revenue - proportionalCostBasis;
  
  // Calculate taxes (30% of capital gains if positive)
  const taxes = capitalGains > 0 ? capitalGains * TAX_RATE : 0;
  
  // Calculate net profit (capital gains minus taxes)
  const netProfit = capitalGains - taxes;

  return {
    netProfit,
    capitalGains,
    taxes
  };
};

export const calculateTotalInvestment = (assets: DigitalAsset[]): number => {
  return assets.reduce((total, asset) => total + (asset.entryPrice * asset.quantity), 0);
};

export const calculateTotalProfits = (assets: DigitalAsset[]): ProfitCalculation => {
  return assets.reduce((total, asset) => {
    let assetProfit = 0;
    let assetGains = 0;
    let assetTaxes = 0;

    Object.values(asset.takeProfitLevels).forEach(level => {
      const profit = calculateProfitForLevel(asset, level);
      if (profit) {
        assetProfit += profit.netProfit;
        assetGains += profit.capitalGains;
        assetTaxes += profit.taxes;
      }
    });

    return {
      netProfit: total.netProfit + assetProfit,
      capitalGains: total.capitalGains + assetGains,
      taxes: total.taxes + assetTaxes
    };
  }, { netProfit: 0, capitalGains: 0, taxes: 0 });
};