import getMarketDataFromCSE from './service/getMarketDataFromCSE';
import uploadToFireStore from './service/uploadToFireStore';
import uploadToFirebaseStorage from './service/uploadToFirebaseStorage';
import { getCurrentReadableFileNameTimeStamp } from '../util/helpers';
import LOGGER from '../util/logger';

const extractAndUploadMarketDataToFirebase = async () => {
  const marketData = await getMarketDataFromCSE();
  const uploadPromiseArray = marketData.map((atomicData, index) => uploadToFireStore(atomicData, index));
  uploadPromiseArray.push(uploadToFirebaseStorage(marketData, getCurrentReadableFileNameTimeStamp()));
  if (uploadPromiseArray?.length) {
    await Promise.all(uploadPromiseArray);
    LOGGER.info(`Completed uploading size: ${marketData.length}`);
  }
};

export default extractAndUploadMarketDataToFirebase;
