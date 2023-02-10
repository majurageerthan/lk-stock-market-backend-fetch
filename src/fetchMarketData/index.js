import buildMarketData from './buildMarketData.js' ;

const run = async (event, context) => {
  buildMarketData();
};

export { run };
