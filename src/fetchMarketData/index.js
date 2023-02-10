import { initializeApp, cert } from 'firebase-admin/app';
import buildMarketData from './buildMarketData';

const serviceAccount = require('../keys/lk-stock-market-firebase-adminsdk-i92xv-951c452b3f.json');

const run = async (event, context) => {
  initializeApp({ credential: cert(serviceAccount) });
  buildMarketData();
};

export { run };
