const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const userInDb = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (userInDb === null) {
        return res.status(400).json({ error: "Incorrect Credentials."});
      }
        
    const userPassword = await bcrypt.compare(password, userInDb.password);

      if (!userInDb || !userPassword) {
        return res.status(400).json({ error: "Incorrect Credentials." });
      }
    
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ data: token });
});

module.exports = router;
