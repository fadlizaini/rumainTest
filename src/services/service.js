import http from '../http';
const getHome = t => {
  return http.get('products', {per_page: 20});
};

export {getHome};
