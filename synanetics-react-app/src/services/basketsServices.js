import client from '../utils/client';

/**
 * Add basket service
 */
export async function addBasket(addData) {
  const response = await client.post(`/baskets/`, addData);

  return response;
}

export async function updateBasketWithIncrease(addData) {
  const response = await client.post(`/baskets/increase`, addData);

  return response;
}

export async function updateBasketWithDecrease(addData) {
  const response = await client.post(`/baskets/decrease`, addData);

  return response;
}

export async function deleteBasketWithLastItem(addData) {
  const response = await client.post(`/baskets/delete`, addData);

  return response;
}

/**
 * View baskets service
 */
export async function viewBaskets() {
  return await client.get(`/baskets/`, {});
}

/**
 * View baskets service
 */
export async function viewBasketsByUser() {
  return await client.get(`/baskets/each`, {});
}

/**
 * View each basket service
 */
export async function viewEachBasket(id) {
  return await client.get(`/baskets/${id}/`, {});
}

/**
 * Update basket service
 */
export async function updateBasket(basketDetail, id) {
  return await client.put(`/baskets/${id}`, basketDetail);
}

/**
 * Delete basket service
 */
export async function deleteBasket(id) {
  return await client.remove(`/baskets/${id}`, {});
}
