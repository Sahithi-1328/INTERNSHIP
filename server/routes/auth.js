const express = require('express');
const router = express.Router();
const User = require('../models/User');
const md5 = require('md5');

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
