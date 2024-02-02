// ======================= MODULES =====================
// THIRD-PARTY / CORE MODULES
const router = require("express").Router();

// USER MODULES
const { login, register } = require("../../controllers/AuthController");
const multer = require("../../utils/multer");
const { authentication, authorization } = require("../../middleware/auth");

// route
router.post("/login", login);
router.post("/register", multer.single("profileImage"), register);

module.exports = router;
