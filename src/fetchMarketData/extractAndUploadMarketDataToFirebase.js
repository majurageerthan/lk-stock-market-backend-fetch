import downloadFromFirebaseStorage from './service/downloadFromFirebaseStorage';
import getMarketDataFromCSE from './service/getMarketDataFromCSE';
import uploadToFireStore from './service/uploadToFireStore';
import uploadToFirebaseStorage from './service/uploadToFirebaseStorage';
import { getCurrentReadableFileNameTimeStamp } from '../util/helpers';

const extractAndUploadMarketDataToFirebase = async () => {
  const marketData = await getMarketDataFromCSE();
  const uploadPromiseArray = marketData.map((atomicData, index) => uploadToFireStore(atomicData, index));
  uploadPromiseArray.push(uploadToFirebaseStorage(marketData, getCurrentReadableFileNameTimeStamp()));
  if (uploadPromiseArray?.length) {
    await Promise.all(uploadPromiseArray);
    console.log(`Completed uploading size: ${marketData.length}`);
  }

  // await uploadToFirebaseStorage(marketData, getCurrentReadableFileNameTimeStamp());
  // await downloadFromFirebaseStorage('08032022');
};

export default extractAndUploadMarketDataToFirebase;
