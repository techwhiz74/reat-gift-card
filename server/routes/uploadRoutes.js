const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (_req, _file, done) => {
    done(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: (_req, file, done) => {
    done(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage,
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const image = req.file.filename;
    res.json({ success: "true", image });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
