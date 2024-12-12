import { sanityFetch } from "../lib/live";
import {
  CATEGORIES_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SEARCH_QUERY,
  PRODUCTS_QUERY,
  SALE_QUERY,
} from "./queries";

export const getSales = async () => {
  try {
    const products = await sanityFetch({
      query: SALE_QUERY,
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching Sale data: ", error);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const products = await sanityFetch({ query: PRODUCTS_QUERY });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching Product data: ", error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({ query: CATEGORIES_QUERY });
    return categories?.data || [];
  } catch (error) {
    console.error("Error fetching Category data: ", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching Product data by slug: ", error);
    return null;
  }
};

export const searchProductsByName = async (searchParam: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam: searchParam },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error searching products by name: ", error);
    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by category: ", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required!");
  }
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return [];
  }
};
