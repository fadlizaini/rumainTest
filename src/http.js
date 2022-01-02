import WooCommerceAPI from 'react-native-woocommerce-api';

const http = new WooCommerceAPI({
  url: 'https://www.npmjs.com/package/react-native-woocommerce-api', // Your store URL
  ssl: true,
  consumerKey: 'ck_48c0fbcc31ae75449e426efc02fcc8ced5a8ff2a', // Your consumer secret
  consumerSecret: 'cs_2241a1f23e2bbb06ad578557243e52ad2db2cc34', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true,
});

export default http;
