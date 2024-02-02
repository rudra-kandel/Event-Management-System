// ======================= MODULES =====================
// THIRD-PARTY / CORE MODULES
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is a required field"],
      unique: [true, "Role name must be unique"],
      trim: true,
    },
  },
  { timestamps: true }
);

roleSchema.pre("save", function (nxt) {
  this.name = this.name.toLowerCase();
  nxt();
});

module.exports = mongoose.model("Role", roleSchema);
