// ======================= MODULES =====================
// THIRD-PARTY / CORE MODULES
const router = require("express").Router();

// USER MODULES
const { login, register } = require("../../controllers/AuthController");
const multer = require("../../utils/multer");

// route
router.post("/login", login);
router.post("/register", multer.single("image"), register);

module.exports = router;
