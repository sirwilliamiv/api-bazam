'use strict'

const passport = require('passport');

module.exports.login = (req, res, next) => {
  console.log("inside the login")
  passport.authenticate('local', (err, user, msg) => {
console.log("hey you're past authenticate", user)
    if (err) { console.log('err in authticate', err)
      return next(err)}
    console.log("hey user here?", user)
      if(!user) {
        console.log('authenticate fired, no user found!')
        return res.status(404).json({msg: 'User not found'})
      }
      req.login(user, (err) => {
        console.log('req.login user', user)
        if(err) return next(err)
          res.status(200).json( { msg: 'successful login', user: user})
      })
  })(req, res, next)
} //end login

module.exports.logout = (req, res) => {
  console.log('logged out!')
  req.logout()

}
