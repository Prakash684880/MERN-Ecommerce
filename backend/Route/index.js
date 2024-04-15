const express = require("express");

const router = express.Router()

const userSignUpController = require('../Controller/userSignup')
const userLoginController = require('../Controller/userLogin')
const userDetailController = require('../Controller/userDetail')
const authToken = require('../middleware/authToken')
router.post('/signup', userSignUpController)
router.post('/login', userLoginController)
router.get('/userDetails', authToken, userDetailController)


module.exports = router