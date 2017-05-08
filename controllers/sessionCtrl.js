'use strict'

const passport = require('passport');

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) return next(err)
      if(!user) {
        console.log('authenticate fired, no user found!')
        return res.status(404).json({msg: 'User not found'})
      }
      req.login(user, (err) => {
        if(err) return next(err)
          res.status(200).json( { msg: 'successful login'})
      })
  })
} //end login

module.exports.logout = (req, res) => {
  console.log('logged out!')
  req.logout()

}
