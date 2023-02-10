import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const uploadToFireStore = async (marketData, index) => {
  const db = getFirestore();

  const stockMarketRef = db.collection('stock-market-lk').doc(`${marketData.id}`);
  const stockMarketMetaRef = stockMarketRef.collection(marketData.name).doc('metaData');

  await stockMarketRef.set({
    [Timestamp.now().toMillis()]: marketData.price,
  }, { merge: true });

  await stockMarketMetaRef.set(marketData, { merge: true });
  // console.log(`${index} Uploaded: ${marketData.name}, price: ${marketData.price}`);
};

export { uploadToFireStore };
