import D08022023 from '../mockData/MarketData/09022023';
import getMarketDataFromCSE from './service/getMarketDataFromCSE';
import { uploadToFireStore } from './service/uploadToFireStore';

const extractAndUploadMarketDataToFirebase = async () => {
  const marketData = await getMarketDataFromCSE();

  marketData.forEach((atomicData) => {
    uploadToFireStore(atomicData);
  });
};

export default extractAndUploadMarketDataToFirebase;
