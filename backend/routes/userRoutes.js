const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController');
const { isAdmin, isLoggedIn } = require('../middleware/authMiddleware');

router.route('/')
.get(userController.getAllUsers)
.post(isAdmin,userController.createUser)
.delete(isAdmin,userController.deleteUser);

router.post('/login',authController.handleUserLogin)
router.post('/signup',authController.handleUserSignup)
router.get('/logout',authController.handleUserLogout);

router.route('/cart')
.get(isLoggedIn,userController.getUserCart);

router.get('/order',isLoggedIn,userController.getOrderHistory);
router.get('/wishlist',isLoggedIn,userController.getUserWishlist);

router.route('/profile')
.get(isLoggedIn,userController.getUserProfile)
.put(isLoggedIn,userController.updateUserProfile)

router.route('/profile/address')
.get(isLoggedIn,userController.getUserAddress)
.put(isLoggedIn,userController.updateUserAddress);

module.exports = router;