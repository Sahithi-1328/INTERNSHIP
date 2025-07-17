const express = require('express');
const router = express.Router();
const User = require('../models/User');
const md5 = require('md5');

// GET all users (optional)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Create new user
router.post('/create', async (req, res) => {
  const { user_id, password, dofcreation, valid, emp_codeno } = req.body;

  try {
    const newUser = await User.create({
      user_id,
      password: md5(password),
      dofcreation,
      valid,
      emp_codeno
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, message: 'User creation failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        user_id: username,
        password: md5(password),
        valid: 1
      }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Wrong Username or Password' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        emp_codeno: user.emp_codeno,
        valid: user.valid
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
