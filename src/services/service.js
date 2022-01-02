import http from '../http';
const getHome = (page = 1) => {
  return http.get('products', {per_page: 20, page});
};

export {getHome};
