'use strict'

const { bookshelf } =require ('../db/database');
const { compare } =require('bycryptjs');

const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },

  comparePassword: (passwordString) => {
    return compare(passwordStr, this.attributes.password)
  }, {
    findByEmail: (email) => {
      return this.forge({email})
      .fetch()
      .then( (user) => {
        console.log('user controller findemail returned: ', user)
        return user
      })
      .catch((err) => {
        console.log("error when no email", err)
        return err
      })
    }
  }

})
