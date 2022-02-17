require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = require('../../config');

// User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contains "password');
        }
      },
    },
    gender: {
      type: String,
      strim: true,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    role: {
      type: String,
      trim: true,
      required: true,
      enum: ['subscriber', 'admin'],
      default: 'subscriber',
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    userImage: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Hide unnecessary field
 */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/**
 * Authentification token with JWT
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    ACCESS_TOKEN_SECRET
    //{ expiresIn: '1000s' }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/**
 * Login user credentials
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  if (user.status !== 'active') {
    throw new Error('user is not active');
  }

  return user;
};

/**
 * middleware
 * Hash the plan text password
 */
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
