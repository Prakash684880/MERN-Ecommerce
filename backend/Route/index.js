const express = require("express");

const router = express.Router()

const userSignUpController = require('../Controller/userSignup')
const userLoginController = require('../Controller/userLogin')
const userDetailController = require('../Controller/userDetail')
const authToken = require('../middleware/authToken')
const userLogout = require('../Controller/userLogout')
const allUser = require('../Controller/allUser')
const updateUser = require('../Controller/updateUser')


router.post('/signup', userSignUpController)
router.post('/login', userLoginController)
router.get('/userDetails', authToken, userDetailController)
router.get("/logout", userLogout)


//adminn panel 

router.get('/all-user', authToken, allUser)
router.post('/update-user', authToken, updateUser)


module.exports = router