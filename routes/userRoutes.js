const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers");
const { protect } = require("../middleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); // Both request supported on the same route
router.post("/login", authUser);

module.exports = router;
