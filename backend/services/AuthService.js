const Role = require("../models/Role");
const User = require("../models/User");

// TO REGISTER USER
exports.registerUser = async (userData, file) => {
  let role = await Role.findOne({ name: "user" });
  if (!role) role = await Role.create({ name: "user" });
  userData.role = role._id;
  if (file) userData.image = file.filename;

  await User.create(userData);
};

// TO LOGIN
exports.loginUser = async (email, password, checked) => {
  let user = await User.findOne({ email }).populate("role");

  if (user) {
    const isPasswordValid = await user.checkPassword(
      password || `${Math.random()}`
    );

    if (isPasswordValid) {
      const authToken = user.getAuthToken(user.role.name, checked);
      const refreshToken = user.getRefreshToken(user.role.name, checked);
      user = await User.findById(user._id).populate("role").select("-password");

      return {
        status: true,
        user,
        authToken,
        refreshToken,
        msg: "Login successful",
      };
    }

    return {
      status: false,
      msg: "Wrong password. Try again",
    };
  } else {
    return {
      status: false,
      msg: "Couldn't find your email, please register first",
    };
  }
};
