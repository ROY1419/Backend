import express from 'express'

import { acceptRide, login, logout, profile, register } from '../controllers/user.controller.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/profile',userAuth, profile)
router.get('/accepted-ride', userAuth, acceptRide )
export default router;