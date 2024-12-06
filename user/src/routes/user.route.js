import express from 'express'
import { login, logout, profile, register } from '../controllers/user.controller.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/profile',userAuth, profile)

export default router;