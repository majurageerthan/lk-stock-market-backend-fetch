// eslint-disable-next-line import/no-unresolved
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import LOGGER from '../../util/logger';
import { MAIN_FIRE_STORE_DB } from '../../util/constants';
import { getReadableCurrentDate } from '../../util/helpers';

const uploadToFireStoreDb = async (marketData, fireStoreRef, key, parameterOfValue) => {
  if (marketData?.[parameterOfValue] && marketData?.[parameterOfValue] !== 0) {
    await fireStoreRef.set({ [key]: marketData[parameterOfValue] }, { merge: true });
  }
};

const uploadMarketPrice = async (marketData, fireStoreRef, timeStampInMillis) => {
  await uploadToFireStoreDb(marketData, fireStoreRef, timeStampInMillis, 'price');
};

const uploadMarketHighPrice = async (marketData, fireStoreRef, currentDateString) => {
  await uploadToFireStoreDb(marketData, fireStoreRef, currentDateString, 'high');
};

const uploadMarketLowPrice = async (marketData, fireStoreRef, currentDateString) => {
  await uploadToFireStoreDb(marketData, fireStoreRef, currentDateString, 'low');
};

const uploadMarketShareVolume = async (marketData, fireStoreRef, currentDateString) => {
  await uploadToFireStoreDb(marketData, fireStoreRef, currentDateString, 'sharevolume');
};

const uploadMarketTradeVolume = async (marketData, fireStoreRef, currentDateString) => {
  await uploadToFireStoreDb(marketData, fireStoreRef, currentDateString, 'tradevolume');
};

const executeAllPromises = async (promises) => {
  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === 'fulfilled') {
      LOGGER.debug(`executeAllPromises: ${result.status}`);
    } else {
      LOGGER.error(result?.reason);
    }
  }
};

const uploadToFireStore = async (marketData, index) => {
  const db = getFirestore();
  const timeStampInMillis = Timestamp.now().toMillis();
  const currentDateString = getReadableCurrentDate();

  const stockMarketRef = db.collection(MAIN_FIRE_STORE_DB).doc(`${marketData.id}`);
  const stockMarketNameCollectionRef = stockMarketRef.collection(marketData.name);
  const stockMarketMetaDocumentRef = stockMarketNameCollectionRef.doc('metaData');
  const stockMarketHighPriceDocumentRef = stockMarketNameCollectionRef.doc('highPrice');
  const stockMarketLowPriceDocumentRef = stockMarketNameCollectionRef.doc('lowPrice');
  const stockMarketShareVolumeDocumentRef = stockMarketNameCollectionRef.doc('shareVolume');
  const stockMarketTradeVolumeDocumentRef = stockMarketNameCollectionRef.doc('tradeVolume');

  const uploadMarketPricePromise = uploadMarketPrice(marketData, stockMarketRef, timeStampInMillis);
  const stockMarketMetaDocumentUpdatePromise = stockMarketMetaDocumentRef.set(marketData, { merge: true });
  const uploadMarketHighPricePromise = uploadMarketHighPrice(marketData, stockMarketHighPriceDocumentRef, currentDateString);
  const uploadMarketLowPricePromise = uploadMarketLowPrice(marketData, stockMarketLowPriceDocumentRef, currentDateString);
  const uploadMarketShareVolumePromise = uploadMarketShareVolume(marketData, stockMarketShareVolumeDocumentRef, currentDateString);
  const uploadMarketTradeVolumePromise = uploadMarketTradeVolume(marketData, stockMarketTradeVolumeDocumentRef, currentDateString);

  const uploadPromises = [
    uploadMarketPricePromise, stockMarketMetaDocumentUpdatePromise, uploadMarketHighPricePromise,
    uploadMarketLowPricePromise, uploadMarketShareVolumePromise, uploadMarketTradeVolumePromise,
  ];

  await executeAllPromises(uploadPromises);
  LOGGER.debug(`${index} Uploaded: ${marketData.name}, price: ${marketData.price}`);
};

export default uploadToFireStore;
