//=========MODULES=========
//third party or core modules

//USER MODULES
const authService = require("../services/AuthService");

// TO REGISTER USER
module.exports.register = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  await authService.registerUser(req.body, req.file);
  return res.json({
    status: true,
    msg: "Registration successful.",
  });
};

// TO LOGIN
module.exports.login = async (req, res) => {
  const { email, password, checked } = req.body;
  const result = await authService.loginUser(email, password, checked);
  return res.json(result);
};
