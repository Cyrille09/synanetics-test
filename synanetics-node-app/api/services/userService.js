const User = require('../models/userModel');

/**
 * Fetch user by ID
 */
async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    return null;
  }
  return user;
}
module.exports.getUserById = getUserById;

/**
 * Find user by ID and update
 */
async function updateUserById(id, updates) {
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) {
    return null;
  }
  return user;
}
module.exports.updateUserById = updateUserById;
