const Promise = require('bluebird')
// promisifyAll will take any typicall function that has a callback structure
// and will wrap it to allow us to use a promise format
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8
  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  // was not working properly in the video, a commenter
  // said that this function should return the sequelize model
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  // the Model is doing the password compare, not the controller,
  // so that we can compare passwords in other places too
  User.prototype.comparePassword = function (password) {
    // compare it to the model's password
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}
