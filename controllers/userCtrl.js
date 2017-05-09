'use strict'

const User = require('../models/User');
const { knex } = require('../db/database');


//add user
module.exports.createUser = ({ body: { name, password } }, res, err) => {
  let email = 'blimp@bubs.com'
  console.log("you hit the user route")
  // User.findOneByEmail(email)
  // .then( (user) => {
  //   if (user) {
  //     res.status(409).json({msg: `User with ${email} already exists`})
  //   } else {
    // return
      User.forge({name, email, password})
      .save()
      .then((data) => {
        res.status(201).json({ msg: 'user added successfully!'} )
        console.log("user added", data)
      })
      .catch((err) => {
        console.log("user not added successfully userCtrl,createUser function", err)
        return err
      })
    // }
  // })
  .catch((err) => {
    console.log("err findingbyemail", err)
    return err
  })
}
