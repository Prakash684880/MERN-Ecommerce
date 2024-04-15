const express = require("express");

const router = express.Router()

const userSignUpController = require('../Controller/userSignup')
const userLoginController = require('../Controller/userLogin')
const userDetailController = require('../Controller/userDetail')
const authToken = require('../middleware/authToken')
const userLogout = require('../Controller/userLogout')
router.post('/signup', userSignUpController)
router.post('/login', userLoginController)
router.get('/userDetails', authToken, userDetailController)
router.get("/logout", userLogout)


module.exports = router