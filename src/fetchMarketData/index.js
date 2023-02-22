import { initializeApp, cert, deleteApp } from 'firebase-admin/app';
import extractAndUploadMarketDataToFirebase from './extractAndUploadMarketDataToFirebase';
import { FIREBASE_MAIN_STORAGE_STOCK_BUCKET, IS_DEV_ENVIRONMENT } from '../util/constants';
import LOGGER from '../util/logger';

const serviceAccount = require('../keys/lk-stock-market-firebase-adminsdk-i92xv-951c452b3f.json');

const run = async (event, context) => {
  LOGGER.info(`Started IS_DEV_ENVIRONMENT: ${IS_DEV_ENVIRONMENT}`);

  let app;
  try {
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: FIREBASE_MAIN_STORAGE_STOCK_BUCKET,
    });
    await extractAndUploadMarketDataToFirebase();
  } catch (error) {
    LOGGER.error(error);
  } finally {
    await deleteApp(app);
  }
};

export { run };
