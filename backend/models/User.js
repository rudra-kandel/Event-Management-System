const mongoose = require("mongoose");
const slugify = require("slugify");
const uniqueSlug = require("unique-slug");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  slug: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  image: {
    type: String,
    default: null,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: [true, "Role is required"],
  },
});

userSchema.pre("save", async function (next) {
  this.slug = await slugify(`${this.name}-${uniqueSlug()}`, { lower: true });
  //hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT) || 10
  );
  next();
});

userSchema.pre("findOneAndUpdate", function (nxt) {
  if (this._update?.name)
    this.findOneAndUpdate(
      {},
      {
        $set: {
          slug: slugify(`${this._update.name}-${uniqueSlug()}`, {
            lower: true,
          }),
        },
      }
    );
  nxt();
});

// To verify user password
userSchema.methods.checkPassword = async function (password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  if (isValidPassword) return true;
  return false;
};

// To generate the auth
userSchema.methods.getAuthToken = function (role, checked = undefined) {
  return jwt.sign(
    { id: this._id, name: this.name, role },
    process.env.APP_PRIVATE_KEY,
    { expiresIn: checked ? "24h" : "12h" }
    // { expiresIn: '60000' }
  );
};

// To generate the refresh token
userSchema.methods.getRefreshToken = function (role, checked = undefined) {
  return jwt.sign(
    { id: this._id, name: this.name, role },
    process.env.APP_PRIVATE_KEY,
    { expiresIn: checked ? "48h" : "24h" }
    // { expiresIn: '300000' }
  );
};

// To hash the password
userSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND) || 12);
  return await bcrypt.hash(password, salt);
};
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
