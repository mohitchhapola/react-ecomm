const express = require("express")
const { createUser, loginUser,logoutUser } = require("../controllers/auth")
const router  = express.Router()


router.post("/user",createUser)
router.post("/user/login",loginUser)
router.get("/user/logout",logoutUser)

module.exports = router;