import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, // Indexed for faster lookups
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }, // Not required for Google login
    minlength: 8,
    // select: false // Prevent password from being sent in queries
  },
  role: {
    type: String,
    enum: ['Job Seeker', 'Company', 'Mentor', 'Student'],
    required: true,
  },
}, { timestamps: true });

// Hash passwords before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password validation method
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;