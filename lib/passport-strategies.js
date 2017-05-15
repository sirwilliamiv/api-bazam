'use strict'

const passport = require('passport');
const { Strategy } = require('passport-local');
const { knex } = require('../db/database');
const User = require('../models/user');

passport.serializeUser((user, done) => done(null,user.id));
passport.deserializeUser((id, done) => {
  knex('users').where({id}).first()
  .then((user) => done(null, user))
  .catch((err) => done(err, null))
});

const localStrategy = new Strategy({
  usernameField:'email',
  passwordField: 'password'
},
(email,password,done) => {
  console.log("inside local strategy")
  User.findOneByEmail(email)
  .then((user) => {
    if (user) {
      console.log("USER USER USER", user.attributes.password)
      let passwordStr = user.attributes.password
      return Promise.all([
        user,
        User.comparePassword(passwordStr)
        ])
    }
    done(null,null,  {msg: "Email does not exist in our system"})
  })
  .then(([user,matches]) => {
    console.log("ps-st-line 34 user", user,"matches", matches)
    if (matches) {
      console.log("inside if(matches) user", user)
      done(null,user,{msg: 'Success!'})
    } else {
      console.log("ps-st-39 user", user, "matches", matches)
      done(null, null, {msg: 'Password does not match'})
    }
  }).catch((err) => {
      console.log(err)
  })
})

passport.use(localStrategy);
