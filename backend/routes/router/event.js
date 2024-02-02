// ======================= MODULES =====================
// THIRD-PARTY / CORE MODULES
const router = require("express").Router();

// USER MODULES
const {
  getAll,
  getOne,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require("../../controllers/EventController");
const multer = require("../../utils/multer");
const { authentication, authorization } = require("../../middleware/auth");

// Route
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", [authentication, multer.single("eventImage")], createEvent);
router.put("/:id", [authentication, multer.single("eventImage")], updateEvent);
router.delete("/:id", [authentication], deleteEvent);
router.get("/register/:id", [authentication], registerForEvent);

module.exports = router;
