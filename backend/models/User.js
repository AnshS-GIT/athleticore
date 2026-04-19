const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes
// Adding an index to 'email' here is redundant if 'unique: true' is present, 
// as MongoDB automatically creates a unique index, but it's good practice to be explicit about it.
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
