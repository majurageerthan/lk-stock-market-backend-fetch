import { DateTime } from 'luxon';

const DATE_TIME_FORMAT = 'dd-MM-yyyy_HH_mm_ss';

export const getReadableFileNameTimeStampFromEpoch = (epochMs) => DateTime.fromMillis(epochMs).toFormat(DATE_TIME_FORMAT);

export const getCurrentReadableFileNameTimeStamp = () => DateTime.now().toFormat(DATE_TIME_FORMAT);
