const express = require("express");
const router = express.Router();
const { getUnreadCounts } = require("../controllers/unreadController");

router.get("/count", getUnreadCounts);

module.exports = router;
