const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/chatbotController');

router.post('/', userCtrl.getChatbot);
router.post('/add', userCtrl.createIntent)
router.delete('/delete/:id', userCtrl.deleteIntents)
router.get('/getchatbot', userCtrl.getIntents)

module.exports = router;