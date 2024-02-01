//=========MODULES=========
//third party or core modules

//USER MODULES

// TO REGISTER USER
module.exports.register = async (req, res) => {
  let role = await Role.findOne({ name: "user" });
  if (!role) role = await Role.create({ name: "user" });
  req.body.role = role._id;

  // FOR PROFILE PICTURE
  if (req.file) req.body.profile = req.file.filename;

  // Check if the user sends veify-email and verify-phone
  if (req.body.emailVerified) delete req.body.emailVerified;
  if (req.body.phoneNumberVerified) delete req.body.phoneNumberVerified;

  //  For setting the field values
  setFields(req);
  const user = await User.create(req.body);

  // To send email
  sendMailToUser(user);

  return res.json({
    status: true,
    msg: "Registration successfull. Please check your email for email verification.",
  });
};

// TO LOGIN
module.exports.login = async (req, res) => {
  const { email, number, password, checked } = req.body;
  if (email || number) {
    let fromPhone = true;
    let user;
    if (email) {
      user = await User.findOne({ email }).populate("role");
      fromPhone = false;
    } else user = await User.findOne({ "phoneNumber.number": number });
    if (user) {
      if (fromPhone) {
        const code = randomCode();
        await sendSMS(number, code, (type = "Phonenumber Verification"));
        if (!user.phoneNumberVerified) {
          await user.updateOne({ phoneNumberVerificationOTP: code });
          const verificationToken =
            await user.getOTPVerificationTokenForLogin();
          return res.status(406).json({
            status: false,
            verificationToken,
            msg: "Please verify your phone for AutoBevy, Verification code has been sent to your registered phone number",
          });
        } else {
          await sendSMS(number, code, (type = "Login"));
          await user.updateOne({ loginOTP: code });
          const getLoginToken = await user.getOTPVerificationTokenForLogin();
          return res.json({
            status: true,
            getLoginToken,
            msg: "Please enter the OTP code which has been sent to your mobile number.",
          });
        }
      } else {
        const isPasswordValid = await user.checkPassword(
          password || `${Math.random()}`
        );
        if (isPasswordValid) {
          if (!user.emailVerified) {
            sendMailToUser(user);
            return res.status(406).json({
              status: false,
              msg: "Please verify your email for AutoBevy, Verification link has been sent to your email",
            });
          }

          const authToken = user.getAuthToken(user.role.name, checked);
          const refreshToken = user.getRefreshToken(user.role.name, checked);
          user = await User.findById(user._id)
            .populate("role")
            .select("-password");
          return res.json({
            status: true,
            user,
            authToken,
            refreshToken,
            msg: "Login successful",
          });
        }
        return res.status(400).json({
          status: false,
          msg: "Wrong password. Try again or click Forgot Password to reset it",
        });
      }
    } else
      return res.status(400).json({
        status: true,
        msg: {
          en: "Couldn't find your email/phonenumber, please register first",
        },
      });
  } else
    return res
      .status(400)
      .json({ status: false, msg: "Email / Phonenumber is required" });
};
