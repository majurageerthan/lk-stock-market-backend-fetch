import getMarketDataFromCSE from './service/getMarketDataFromCSE';
import { uploadToFireStore } from './service/uploadToFireStore';

const extractAndUploadMarketDataToFirebase = async () => {
  const marketData = await getMarketDataFromCSE();
  const uploadPromiseArray = marketData.map((atomicData, index) => uploadToFireStore(atomicData, index));

  if (uploadPromiseArray?.length) {
    await Promise.all(uploadPromiseArray);
    console.log(`Completed uploading size: ${marketData.length}`);
  }
};

export default extractAndUploadMarketDataToFirebase;
