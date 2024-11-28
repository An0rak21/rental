export const narrativeTPPercentages = {
  'HighRisk': {
    tp1: 30,
    tp2: 25,
    tp3: 10,
    tp4: 5,
    moonbag: 30
  },
  'Airdrop': {
    tp1: 30,
    tp2: 25,
    tp3: 10,
    tp4: 5,
    moonbag: 30
  },
  'MidCap': {
    tp1: 25,
    tp2: 20,
    tp3: 15,
    tp4: 10,
    moonbag: 30
  },
  'HighCap': {
    tp1: 25,
    tp2: 20,
    tp3: 15,
    tp4: 10,
    moonbag: 30
  },
  'BlueChips': {
    tp1: 20,
    tp2: 15,
    tp3: 10,
    tp4: 10,
    moonbag: 45
  },
  'Actions': {
    tp1: 30,
    tp2: 25,
    tp3: 25,
    tp4: 10,
    moonbag: 10
  }
};

export type AssetCategory = keyof typeof narrativeTPPercentages;