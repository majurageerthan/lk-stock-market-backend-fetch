import { getStorage } from 'firebase-admin/storage';
import { FIREBASE_STORAGE_STOCK_DATA_FOLDER } from '../../util/constants';

const uploadToFirebaseStorage = async (data, jsonFileNameToSave) => {
  const bucket = getStorage().bucket();
  const file = bucket.file(`${FIREBASE_STORAGE_STOCK_DATA_FOLDER}/${jsonFileNameToSave}.json`);
  const contents = JSON.stringify(data);
  await file.save(contents);
  console.log('uploadToFirebaseStorage');
};

// DD-mm-yyyy_hh_mm_ss

export default uploadToFirebaseStorage;
