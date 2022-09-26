const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const itemsController = require("../controllers/items");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Item Routes - simplified for now
router.get("/:id", ensureAuth, itemsController.getItem);

router.post("/createItem", upload.single("file"), itemsController.createItem);

router.delete("/deleteItem/:id", itemsController.deleteItem);

module.exports = router;
