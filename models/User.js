'use strict'

const { bookshelf } =require ('../db/database');
const { compare } = require('bcryptjs');

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },


  comparePassword: function (passwordString)  {
    console.log("passwordSTring", passwordString)
    return  compare(passwordString, this.attributes.password)
  }

}, {
  findOneByEmail: function (email) {
    console.log("email", email)
      return this.forge({email})
      .fetch()
      .then( (user) => {
        console.log('user model find email returned: ', user)
        return user
      })
      .catch((err) => {
        console.log("error when no email", err)
        return err
      })
    }
}


)

module.exports = User;
