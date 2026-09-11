const express = require("express");

const {
  getspots,
  getspotById,
  createspot,
  updatespot,
  deletespot,
} = require("../controllers/spotController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();



router.get("/", getspots);

router.get("/:id", getspotById);



router.post(
  "/",
  protect,
  authorize("admin"),
  createspot
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updatespot
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deletespot
);


module.exports = router;