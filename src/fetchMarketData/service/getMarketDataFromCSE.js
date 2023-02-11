import axios from 'axios';
import { CSE_WEB_SITE_CONFIG } from '../../util/constants';

const getMarketDataFromCSE = async () => {
  try {
    const response = await axios(CSE_WEB_SITE_CONFIG);
    return response?.data?.reqByMarketcap;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getMarketDataFromCSE;
