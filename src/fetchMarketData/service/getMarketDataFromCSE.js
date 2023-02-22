import axios from 'axios';
import { CSE_WEB_SITE_CONFIG, IS_DEV_ENVIRONMENT } from '../../util/constants';
import D08022023_LITE from '../../mockData/MarketData/08022023_LITE';
import LOGGER from '../../util/logger';

const getMarketDataFromCSE = async () => {
  if (IS_DEV_ENVIRONMENT) {
    LOGGER.info('Dev environment detected, sending mock data for getMarketDataFromCSE', IS_DEV_ENVIRONMENT);
    return D08022023_LITE?.reqByMarketcap;
  }

  try {
    const response = await axios(CSE_WEB_SITE_CONFIG);
    return response?.data?.reqByMarketcap;
  } catch (error) {
    LOGGER.error(error);
    return [];
  }
};

export default getMarketDataFromCSE;
