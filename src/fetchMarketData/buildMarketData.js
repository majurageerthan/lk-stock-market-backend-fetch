import D08022023 from '../mockData/MarketData/08022023';
import { uploadToFireStore } from './service/uploadToFireStore';

const marketData = {
  id: 1803,
  name: 'EXPOLANKA HOLDINGS PLC',
  symbol: 'EXPO.N0000',
  high: 194,
  low: 189,
  percentageChange: -2.1907216494845363,
  change: -4.25,
  price: 189.75,
  quantity: 2500,
  issueDate: '13/JUN/2011',
  sharevolume: 664455,
  tradevolume: 378,
  turnover: 126880350.25,
  lastTradedTime: 1675755229201,
  marketCap: 370945121250,
  marketCapPercentage: 9.664068,
  issuedQTY: 1954915000,
};

const buildMarketData = async () => {
  const { reqByMarketcap } = D08022023;
  await uploadToFireStore(marketData);
  reqByMarketcap.forEach((atomicData) => {
    // console.log(atomicData);
  });
};

export default buildMarketData;
