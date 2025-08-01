import express from 'express'
import { signup } from '../controllers/signupController.js'
import db from '../config/db.js'

const router = express.Router()

// Sign up route
router.post('/signup', signup)

// Check if email already exists
router.post('/check-email', async (req, res) => {
  const { email, userType } = req.body
  try {
    const table =
      userType === 'Customer'
        ? 'customers'
        : userType === 'Service Provider'
        ? 'serviceprovider'
        : userType === 'Admin'
        ? 'admin'
        : null

    if (!table) return res.status(400).json({ error: 'Invalid userType' })

    const [rows] = await db.execute(`SELECT * FROM ${table} WHERE email = ?`, [email])
    res.json({ exists: rows.length > 0 })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
