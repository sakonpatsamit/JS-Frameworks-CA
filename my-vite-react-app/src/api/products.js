const API_PRODUCTS = "https://api.noroff.dev/api/v1/online-shop";

export async function getProducts() {
  const res = await fetch(API_PRODUCTS);

  if (res.ok) return await res.json();

  throw new Error("Unable to get products from server");
}

export async function getProductById(productId) {
  const res = await fetch(API_PRODUCTS + `/${productId}`);

  if (res.ok) return await res.json();

  throw new Error("Unable to get product from server");
}
