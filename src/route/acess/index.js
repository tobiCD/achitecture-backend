const express = require('express');
const acessControler = require('../../controllers/acess.controler');  // Controller file
const { asyncHandler } = require('../../auth/checkAuth');  // Middleware for async error handling

const router = express.Router();

// Define the signup route and use asyncHandler for error handling
router.post('/shop/signup',asyncHandler( acessControler.signUp));

module.exports = router;