import client from '../utils/client';

/**
 * Add user service
 */
export async function addUser(addData) {
  const response = await client.post(`/users/`, addData);

  return response;
}

/**
 * View users service
 */
export async function viewUsers() {
  return await client.get(`/users/`, {});
}

/**
 * View each user service
 */
export async function viewEachUser(id) {
  return await client.get(`/users/${id}/`, {});
}

/**
 * View user profile service
 */
export async function viewUserProfile() {
  return await client.get(`/users/me/`, {});
}

export async function viewImage() {
  return await client.get(`/users/image/me/`, {});
}

export async function updateUserProfile(userDetail) {
  return await client.put(`/users/profile/me`, {
    userDetail,
  });
}

/**
 * Update user service
 */
export async function updateUser(userDetail, id) {
  return await client.put(`/users/${id}`, userDetail);
}

export async function updateUserProfileImage(data) {
  return await client.put(`/users/profile/photo/me/`, data);
}

/**
 * Login service
 */
export async function login(email, password) {
  const response = await client.post('/users/login/', {
    email: email,
    password: password,
  });

  return response;
}

/**
 * Change password service
 */

export async function changeUserPassword(resetPassword) {
  return await client.post(`/users/changePassword/me`, resetPassword);
}

/**
 * Logout userservice
 */
export async function logout() {
  return await client.post(`/users/logout`, {});
}

/**
 * Delete user service
 */
export async function deleteUser(id) {
  console.log(id);
  return await client.remove(`/users/${id}`, {});
}

export async function deleteUserProfile() {
  return await client.remove(`/users/profile/me`, {});
}

export async function deleteImage() {
  return await client.remove(`/users/image/me`);
}

export async function deleteImageLogo() {
  return await client.remove(`/users/imageLogo/me`);
}
