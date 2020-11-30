const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/authController');
const url = require('../config/config');
const {
    check
} = require('express-validator');
//const { checkSchema } = require('express-validator/check');

router.post('/signin', [
    check('email').exists().isEmail(),
    check('password').exists().isString().isLength({
        min: 5
    })
], userCtrl.signin);

router.post('/logout', userCtrl.logout);

module.exports = router;