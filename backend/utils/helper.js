// ======================= MODULES =====================
// THIRD PARTY OR CORE MODULES
const fs = require("fs");
const path = require("path");

// To creae upload folder if not exists
module.exports.checkFolder = () => {
  const filePath = path.join(path.parse(__dirname).dir, "uploads");
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
};
