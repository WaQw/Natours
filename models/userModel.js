const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true, // convert to lowercase
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    select: false, // not shown in output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'], // required input, but not required to be persisted in db
    validate: {
      validator: function (val) {
        return val === this.password; // false then error
      },
      message: 'Passwords are not the same!',
    },
  },
});

// Password Encryption
// pre save middleware (between getting the data and saving it into db)
userSchema.pre('save', async function (next) {
  // if password does not change, maybe email/name change
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

// Check Whether Password is Correct
// instance method for all documents in the collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
