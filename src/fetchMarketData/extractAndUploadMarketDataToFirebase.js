import getMarketDataFromCSE from './service/getMarketDataFromCSE';
import { uploadToFireStore } from './service/uploadToFireStore';

const extractAndUploadMarketDataToFirebase = async () => {
  const marketData = await getMarketDataFromCSE();
  const uploadPromiseArray = marketData.map((atomicData, index) => uploadToFireStore(atomicData, index));

  // marketData.forEach((atomicData) => {
  //   uploadToFireStore(atomicData);
  // });

  // for (const atomicData of marketData) {
  //   await uploadToFireStore(atomicData);
  // }
  console.log(`Started uploading size: ${marketData.length}`);
  await Promise.all(uploadPromiseArray);
};

export default extractAndUploadMarketDataToFirebase;
