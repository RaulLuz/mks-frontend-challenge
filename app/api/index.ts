import { Product } from "../types/Product";

const getProducts = async () => {
  const URL =
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC";

  const response = await fetch(URL);

  const data = await response.json();

  return data.products as Product[];
};

export default getProducts;
