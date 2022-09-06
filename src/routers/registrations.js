const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    const { username, password } = req.body;
      
    const hashCode = await bcrypt.hash(password, 10);
    const userCreated = await prisma.user.create({
      data: {
        username,
        password: hashCode,
      },
    });
res.status(201).json({ user: userCreated })
});

module.exports = router;
