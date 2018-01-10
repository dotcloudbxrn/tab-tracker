const passport = require('passport')
const {User} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    // if someone makes a req that has the bearer token in the authorisation
    // it's going to use that
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
    // return messages based on payload truthfulness
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          // whatever we signed! from the authentication controller. we're taking the id
          id: jwtPayload.id
        }
      })
      if (!user) {
        return done(new Error(), false)
      }
      // will finally attach the user into req.user?
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
