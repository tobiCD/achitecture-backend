const express = require('express')
const { route } = require('../../app')
const acessControler = require('../../controllers/acess.controler')
const router = express.Router()

router.post('/shop/signup',acessControler.signUp)

module.exports = router
