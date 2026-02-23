import type { Challenge } from "../types/challenge";

const BASE_URL = "https://dummyjson.com";

function mapCategory(category: string): string {
  switch (category.toLowerCase()) {
    case "smartphones":
    case "laptops":
      return "Web";
    case "fragrances":
    case "skincare":
      return "Forensics";
    case "groceries":
      return "Crypto";
    default:
      return "Web"; // fallback
  }
}


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
  category: mapCategory(product.category), // <-- mapped here
  points: product.price,
  difficulty: product.rating,
  author: product.brand,
}));

}
export async function fetchChallengeById(id: string): Promise<Challenge> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Challenge not found");
  }

  const product = await response.json();

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    category: mapCategory(product.category),
    points: product.price,
    difficulty: product.rating,
    author: product.brand,
  };
}
const BACKEND_URL = "http://localhost:5000";

export interface posts {
  id: number;
  challengeId: number;
  title: string;
  content: string;
  author: string;
  difficulty: string;
}

export async function fetchPosts(): Promise<posts[]> {
  const response = await fetch(`${BACKEND_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function fetchPostsByChallengeId(
  challengeId: number
): Promise<posts[]> {
  const response = await fetch(
    `${BACKEND_URL}/posts?challengeId=${challengeId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

