// you use destructurising because just this require is going to
// return the index.js, containing all the initiated Data Models
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// helper function
function jwtSignUser (user) {
  // we'll use the jwt library to give us back a jwt token
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

// Export whatever routes should be associated with authentication
module.exports = {
  // to make a method async instead of using promises
  // you type async in front of its name, then
  // await the queried task
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information you provided is incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to log you in.'
      })
    }
  }
}
