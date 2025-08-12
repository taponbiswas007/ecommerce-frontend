// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Product-related APIs
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

// Signup API function
export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', {
      name,
      email,
      password,
    });

    const data = response.data;

    // Save token and user info locally
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("User registered:", data.user);
    return true;
  } catch (error: any) {
    if (error.response) {
      console.error("Signup API error:", error.response.data.message || error.message);
      throw new Error(error.response.data.message || "Signup failed");
    } else {
      console.error("Signup error:", error.message);
      throw new Error(error.message || "Signup failed");
    }
  }
};

export default api;
