const express = require('express')
const UserModel = require('../Models/users.model')
const userRoute = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth.middleware')

userRoute.post('/register', async (req, res) => {
    const { email, name, password } = req.body
    try {
        const hash = await bcrypt.hash(password, Number(process.env.saltRound))
        const newUser = new UserModel({ name, email, password: hash })
        await newUser.save()
        res.status(201).send({ msg: 'registration successfull' })
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    const matchUser = await UserModel.findOne({ email })
    if (matchUser) {
        try {
            let result = await bcrypt.compare(password, matchUser.password)
            if (result) {
                const token = jwt.sign({ userId: matchUser._id }, process.env.secret_key, { expiresIn: '1d' })
                res.status(200).send({ msg: 'login successfull', token })
            } else {
                res.status(401).send({ msg: 'in-correct password' })
            }
        } catch (error) {
            res.status(400).send({ msg: error.message })
        }
    } else {
        res.status(404).send({ msg: 'user not found' })
    }
})

userRoute.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const hash = await bcrypt.hash(password, Number(process.env.saltRound));
    user.password = hash;
    await user.save();
    res.status(200).send({ msg: 'Password reset successful' });

  } catch (error) {
    res.status(500).send({ msg: 'Internal server error', error: error.message });
  }
});

module.exports = userRoute
