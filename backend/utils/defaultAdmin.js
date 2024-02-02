// ======================= MODULES =====================
// USER MODULES
const { User, Role } = require("../models/index");

// To create admin
module.exports = async () => {
  let role = await Role.findOne({ name: "admin" });
  if (!role) role = await Role.create({ name: "admin" });

  const adminData = {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
    slug: "admin",
    role: role._id,
  };

  const checkUser = await User.findOne({ email: adminData.email });
  if (!checkUser) await User.create(adminData);
};
