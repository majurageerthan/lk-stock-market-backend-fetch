import { getStorage } from 'firebase-admin/storage';
import { FIREBASE_STORAGE_STOCK_DATA_FOLDER, IS_DEV_ENVIRONMENT } from '../../util/constants';
import LOGGER from '../../util/logger';

const uploadToFirebaseStorage = async (data, jsonFileNameToSave) => {
  if (IS_DEV_ENVIRONMENT) {
    LOGGER.info('Dev environment detected, skipping uploadToFirebaseStorage', IS_DEV_ENVIRONMENT);
    return;
  }

  const bucket = getStorage().bucket();
  const file = bucket.file(`${FIREBASE_STORAGE_STOCK_DATA_FOLDER}/${jsonFileNameToSave}.json`);
  const contents = JSON.stringify(data);
  await file.save(contents);
  LOGGER.info(`uploadToFirebaseStorage: ${jsonFileNameToSave}`);
};

// DD-mm-yyyy_hh_mm_ss

export default uploadToFirebaseStorage;
