import { getStorage } from 'firebase-admin/storage';
import { FIREBASE_STORAGE_STOCK_DATA_FOLDER } from '../../util/constants';
import LOGGER from '../../util/logger';

const downloadPath = '/home/majuran/projects/personal/lk-stock-market-backend-fetch/src/fetchMarketData/service/08032022.json';
const downloadOptions = {
  destination: downloadPath,
};

const downloadFromFirebaseStorage = async (jsonFileNameToDownload) => {
  const bucket = getStorage().bucket();
  LOGGER.log('Downloaded a blob!');
  await bucket.file(`${FIREBASE_STORAGE_STOCK_DATA_FOLDER}/${jsonFileNameToDownload}.json`).download(downloadOptions);
};

export default downloadFromFirebaseStorage;