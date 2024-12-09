import express from 'express'
import { login, logout, profile, register, toggleAvailablity, waitForNewRide } from '../controllers/captain.controller.js'
import captainAuth from '../middleware/authMiddleware.js'

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/profile',captainAuth, profile)
router.patch('/toggle-availablity', captainAuth, toggleAvailablity )
router.get('/new-ride', captainAuth, waitForNewRide)

export default router;