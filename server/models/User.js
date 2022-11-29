import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
    unique: [true, 'That email address is already in use'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, [
          { minLowercase: 1, minUppercase: 1, minNumbers: 1, minLength: 8 },
        ]);
      },
      message:
        'Password must contain 8 characters: one uppercase, one lowercase, and one number.',
    },
  },
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function () {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

UserSchema.methods.createToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const User = mongoose.model('User', UserSchema);
export default User;
