// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await api.get('/public-products');
  return response.data;
};

export const fetchCategoryProducts = async (categoryId: number) => {
  const response = await api.get(`/categories/${categoryId}/products`);
  return response.data;
};

export const fetchProductDetails = async (productId: number) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export default api;