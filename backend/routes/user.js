const express = require("express")
const { fetchUserById, updateUser } = require("../controllers/user")
const router = express.Router()

router.get("/user",fetchUserById)
router.patch('/user/update/:id',updateUser)

module.exports = router;