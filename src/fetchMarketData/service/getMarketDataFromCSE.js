import axios from 'axios';

const data = JSON.stringify({
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
  },
});

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://www.cse.lk/api/list_by_market_cap',
  headers: {
    authority: 'www.cse.lk',
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en',
    'content-type': 'application/json',
    cookie: '_ga=GA1.2.936302709.1674818888; _fbp=fb.1.1674818888547.1404520106; _gid=GA1.2.1859501037.1675779039; AWSALB=TzmYYWJ34JRv1g77Y/iNp1o3SdBU4aVYNYw7b9pdZUjnpZP8FqCELlcq/X7lE5kiGKxsF5o5qmyK480aWWQ0/FMZx6GdK0STWyY2WuV0CdQkb1Vd+xiCIpsBZIgA; AWSALBCORS=TzmYYWJ34JRv1g77Y/iNp1o3SdBU4aVYNYw7b9pdZUjnpZP8FqCELlcq/X7lE5kiGKxsF5o5qmyK480aWWQ0/FMZx6GdK0STWyY2WuV0CdQkb1Vd+xiCIpsBZIgA; _gat_gtag_UA_3118968_1=1; AWSALB=BWlcW0sHoebhMXStoqApwJs99r7hrj5J92AbiFZoBOQS2vl0+9EFKs/amY+2gol7R2DrCJA6P9UigTuvC3Nwpi4rk23qLSbTdVx36MRwLdlbLZoRfi609q+5NkNL; AWSALBCORS=BWlcW0sHoebhMXStoqApwJs99r7hrj5J92AbiFZoBOQS2vl0+9EFKs/amY+2gol7R2DrCJA6P9UigTuvC3Nwpi4rk23qLSbTdVx36MRwLdlbLZoRfi609q+5NkNL',
    origin: 'https://www.cse.lk',
    referer: 'https://www.cse.lk/pages/market-capitalization/market-capitalization.html',
    'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  },
  data,
};

const getMarketDataFromCSE = async () => {
  try {
    const response = await axios(config);
    return response?.data?.reqByMarketcap;
  } catch (error) {
    console.error(error);
    return {};
  }
};

// axios(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

export default getMarketDataFromCSE;
