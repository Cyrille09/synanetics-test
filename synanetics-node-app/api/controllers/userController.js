const User = require('../models/userModel');
const UserService = require('../services/userService');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { CascadeDeleteUser } = require('../deleteCascade/deleteCascade');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlinkSync);

/**
 * GET: /api/synanetics/users
 * Returns all users
 */
async function getAllUsers(req, res, next) {
  try {
    const PER_PAGE = 5;
    const { page = 1 } = req.query;

    // Build DB query
    let query = {};

    // Count results
    const total = await User.countDocuments(query);
    const users = await User.find(query);

    res.status(200).json({ users, page, perPage: PER_PAGE, total });
  } catch (error) {
    next(error);
  }
}

/**
 * GET: /api/synanetics/users/:id
 * Returns a single user by ID
 */
async function getEachUser(req, res, next) {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: 'User ID does not exist' });
    }

    res.status(200).json({ user });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
    console.log(error);
  }
}

/**
 * POST: /api/synanetics/users
 * Add a new user and returns it response
 */
async function addUser(req, res, next) {
  const newUser = new User(req.body);
  try {
    // Return error message
    let errorMessage = '';
    let {
      passwordError,
      confirmPasswordError,
      emailError,
      mobileError,
      firstNameError,
      lastNameError,
      roleError,
      genderError,
    } = errorMessage;
    const email = req.body.email;
    const mobileParsed = parsePhoneNumberFromString(req.body.mobile, 'GB');
    if (
      !req.body.password ||
      req.body.password.length < 8 ||
      !req.body.confirm_password ||
      req.body.password.toLowerCase().includes('password') ||
      req.body.password !== req.body.confirm_password ||
      !req.body.role ||
      !req.body.gender ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !validator.isEmail(email) ||
      !mobileParsed ||
      !mobileParsed.isValid()
    ) {
      if (!req.body.password) {
        passwordError = 'Password Required';
      } else if (req.body.password.length < 8) {
        passwordError = 'Password must be minimum 8 characters';
      } else if (req.body.password.toLowerCase().includes('password')) {
        passwordError = "Password cannot contain 'password'";
      }
      if (!req.body.confirm_password) {
        confirmPasswordError = 'Confirm password field required';
      }
      if (req.body.password !== req.body.confirm_password) {
        confirmPasswordError = 'Password and confirm password must match';
      }
      if (!req.body.gender) {
        genderError = 'Required';
      }
      if (!req.body.firstName) {
        firstNameError = 'Required';
      }
      if (!req.body.lastName) {
        lastNameError = 'Required';
      }
      if (!req.body.role) {
        roleError = 'Required';
      }
      if (!req.body.gender) {
        genderError = 'Required';
      }
      if (!req.body.phone) {
        phoneError = 'Required';
      } else if (!phoneParsed || !phoneParsed.isValid()) {
        phoneError =
          'Please enter a valid phone number including country code (e.g. +44)';
      }
      if (!req.body.email) {
        emailError = 'Required';
      } else if (!validator.isEmail(email)) {
        emailError = 'Invalid Email';
      }
      console.log(req.body);
      return res.status(400).json({
        status: 400,
        passwordError: passwordError,
        confirmPasswordError: confirmPasswordError,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        roleError: roleError,
        emailError: emailError,
        mobileError: mobileError,
        genderError: genderError,
      });
    }

    // Save a user record
    const user = await newUser.save();

    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    // Return duplicate key error message
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: 409, emailError: 'Email already exist' });
    }
    next(error);
  }
}

/**
 * GET: /api/synanetics/users/me
 * Returns user profile
 */
async function getUserProfile(req, res, next) {
  try {
    const user = req.user;
    const token = req.token;

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT: /api/synanetics/users/profile/me
 * Update a user profile and returns it response
 */
async function updateUserProfile(req, res, next) {
  try {
    req.body = req.body.userDetail;
    // Check the email
    const regexEmail = new RegExp('^' + req.body.email + '$', 'i');
    // get the existemt email address
    const existentEmail = await User.findOne({
      _id: { $ne: req.user._id },
      email: regexEmail,
    });
    if (existentEmail) {
      return res
        .status(404)
        .json({ status: 404, errorEmail: 'Email already exist' });
    }
    const user = await UserService.updateUserById(req.user, req.body, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: 'User profile does not exist' });
    }

    res.json(user);
  } catch (error) {
    // Return duplicate key error message
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: 409, emailError: 'Email already exist' });
    }
    // Return invalid user ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

/**
 * PUT: /api/synanetics/users/:id
 * Update a user by ID and returns it response
 */
async function updateUser(req, res, next) {
  try {
    const user = await UserService.updateUserById(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, error: 'Record does not exist' });
    }

    res.json(user);
  } catch (error) {
    // Return duplicate key error message
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: 409, error: 'Email already exist' });
    }
    // Return invalid user ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

/**
 * GET: /api/synanetics/users/image/me
 * Returns user profile image
 */
async function getImage(req, res, next) {
  try {
    const user = req.user;
    const userImage = user.userImage;
    res.json({ userImage });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT: /api/synanetics/users/profile/photo/me
 * Update a user profile and returns it response
 */
async function uploadImage(req, res, next) {
  try {
    const fileName = req.file.filename;

    if (req.file && req.file.filename && req.user) {
      const userOne = await UserService.getUserById(req.user._id);

      if (!userOne) {
        return res
          .status(404)
          .json({ status: 404, error: 'Record does not exist' });
      }
      // myFile.mv(`public/images/users/${fileName}`, function (err) {
      //   if (err) {
      //     return res.status(400).send({ msg: 'Error occured' });
      //   } else {
      //     console.log('Successfully moved the file!');
      //   }
      // });

      // Delete user image from public folder
      if (req.user.userImage) {
        const dir = `public/images/users/${req.user.userImage}`;
        fs.access(dir, (err) => {
          err ? null : unlinkFile(dir);
        });
      }

      req.user.userImage = fileName;
      await req.user.save();
    }
    const user = req.user;

    if (!user) {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * POST: /api/synanetics/users/login
 * Returns a login user response
 */
async function login(req, res, next) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (user.tokens.length >= 10) {
      user.tokens = [];
      await user.save();
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: 'Your credential does not match to our record.',
    });
  }
}

/**
 * POST: /api/synanetics/users/logout
 * Logout a user from the active device
 */
async function logout(req, res, next) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    return res.status(200).json({ status: 200, message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
}

/**
 * POST: /api/synanetics/users/logoutAll
 * Logout a user from all devices
 */
async function logoutAll(req, res, next) {
  try {
    req.user.tokens = [];
    await req.user.save();
    return res.status(200).json({
      status: 200,
      message: 'Logout successful from all device',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST: /api/synanetics/users/changePassword/me
 * Reset a profile password by login user
 */
async function changePasswordByLoginUser(req, res, next) {
  try {
    if (req.user.email === null) {
      return res
        .status(404)
        .json({ status: 404, error: 'Record does not exist' });
    }

    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    let errorMessage = '';
    let { newPasswordError, confirmPasswordError, oldPasswordError } =
      errorMessage;
    if (
      !req.body.password ||
      req.body.password.length < 8 ||
      !req.body.confirmPassword ||
      !req.body.oldPassword ||
      !isMatch ||
      req.body.password.toLowerCase().includes('password') ||
      req.body.password !== req.body.confirmPassword
    ) {
      if (!req.body.password) {
        newPasswordError = 'New Password field required';
      } else if (req.body.password.length < 8) {
        newPasswordError = 'New Password must be minimum 8 characters';
      } else if (req.body.password.toLowerCase().includes('password')) {
        newPasswordError = "New Password cannot contain 'password'";
      }
      if (!req.body.confirmPassword) {
        confirmPasswordError = 'Confirm password field required';
      }
      if (req.body.password !== req.body.confirmPassword) {
        confirmPasswordError = 'Password and confirm password must match';
      }
      if (!req.body.oldPassword) {
        oldPasswordError = 'old password field required';
      } else if (!isMatch) {
        oldPasswordError = 'Wrong password';
      }
      return res.status(400).json({
        newPasswordError: newPasswordError,
        confirmPasswordError: confirmPasswordError,
        oldPasswordError: oldPasswordError,
      });
    }

    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await UserService.updateUserById(req.user, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE: /api/synanetics/users/profile/me
 * Delete a user profile and returns a json message
 */
async function deleteUserProfile(req, res, next) {
  try {
    const deleteUser = await CascadeDeleteUser(req.user._id);
    await deleteUser.remove();

    const fullName = `${deleteUser.firstName} ${deleteUser.lastName} has been deleted`;
    res.status(200).json(fullName);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE: /api/synanetics/users/image/me
 * Delete a user profile image and returns a json message
 */
async function deleteImage(req, res, next) {
  try {
    const userImage = req.user.userImage;
    req.user.userImage = undefined;
    await req.user.save();

    // Delete user image from public folder
    if (userImage) {
      const dir = `public/images/users/${userImage}`;
      fs.access(dir, (err) => {
        err ? null : unlinkFile(dir);
      });
    }

    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE: /api/synanetics/users/:id
 * Delete a user by ID and returns a json message
 */
async function deleteUser(req, res, next) {
  try {
    const userImage = req.user.userImage;

    const deleteUser = await CascadeDeleteUser(req.params.id);
    await deleteUser.remove();

    // Delete user image from public folder
    if (userImage) {
      const dir = `public/images/users/${userImage}`;
      fs.access(dir, (err) => {
        err ? null : unlinkFile(dir);
      });
    }

    const fullName = `${deleteUser.firstName} ${deleteUser.lastName} has been deleted`;
    res.status(200).json({ status: 200, message: fullName });
  } catch (error) {
    // Return invalid role ID error message
    if (error.name === 'CastError') {
      return res.status(404).json({ status: 404, error: 'Invalid ID' });
    }
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getEachUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  getUserProfile,
  logout,
  logoutAll,
  deleteUserProfile,
  deleteImage,
  updateUserProfile,
  changePasswordByLoginUser,
  uploadImage,
  getImage,
};
