import type { Challenge } from "../types/challenge";

const BASE_URL = "https://dummyjson.com";

interface ProductResponse {
  products: {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    brand: string;
  }[];
}

export async function fetchChallenges(): Promise<Challenge[]> {
  const response = await fetch(`${BASE_URL}/products`);
  const data: ProductResponse = await response.json();

  return data.products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    points: product.price,
    difficulty: product.rating,
    author: product.brand,
  }));
}
