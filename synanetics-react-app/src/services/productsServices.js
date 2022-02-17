import client from '../utils/client';

/**
 * Add product service
 */
export async function addProduct(addData) {
  const response = await client.post(`/products/`, addData);

  return response;
}

/**
 * View products service
 */
export async function viewProducts() {
  return await client.get(`/products/`, {});
}

/**
 * View each product service
 */
export async function viewEachProduct(id) {
  return await client.get(`/products/${id}/`, {});
}

/**
 * Update product service
 */
export async function updateProduct(productDetail, id) {
  return await client.put(`/products/${id}`, productDetail);
}

/**
 * Delete product service
 */
export async function deleteProduct(id) {
  return await client.remove(`/products/${id}`, {});
}
