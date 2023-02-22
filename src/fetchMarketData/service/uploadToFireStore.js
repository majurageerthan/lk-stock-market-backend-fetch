// eslint-disable-next-line import/no-unresolved
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import LOGGER from '../../util/logger';
import { MAIN_FIRE_STORE_DB } from '../../util/constants';
import { getReadableCurrentDate } from '../../util/helpers';

const uploadMarketPrice = async (marketData, fireStoreRef, timeStampInMillis) => {
  if (marketData?.price && marketData?.price !== 0) {
    await fireStoreRef.set({ [timeStampInMillis]: marketData.price }, { merge: true });
  }
};

const uploadMarketHighPrice = async (marketData, fireStoreRef, currentDateString) => {
  if (marketData?.high && marketData?.high !== 0) {
    await fireStoreRef.set({ [currentDateString]: marketData.high }, { merge: true });
  }
};

const uploadMarketLowPrice = async (marketData, fireStoreRef, currentDateString) => {
  if (marketData?.low && marketData?.low !== 0) {
    await fireStoreRef.set({ [currentDateString]: marketData.low }, { merge: true });
  }
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

  const uploadMarketPricePromise = uploadMarketPrice(marketData, stockMarketRef, timeStampInMillis);
  const stockMarketMetaDocumentUpdatePromise = stockMarketMetaDocumentRef.set(marketData, { merge: true });
  const uploadMarketHighPricePromise = uploadMarketHighPrice(marketData, stockMarketHighPriceDocumentRef, currentDateString);
  const uploadMarketLowPricePromise = uploadMarketLowPrice(marketData, stockMarketLowPriceDocumentRef, currentDateString);

  const uploadPromises = [uploadMarketPricePromise, stockMarketMetaDocumentUpdatePromise, uploadMarketHighPricePromise, uploadMarketLowPricePromise];
  await executeAllPromises(uploadPromises);
  LOGGER.debug(`${index} Uploaded: ${marketData.name}, price: ${marketData.price}`);
};

export default uploadToFireStore;
