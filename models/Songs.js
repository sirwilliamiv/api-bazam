'use strict'

const { bookshelf } = require('../db/database');


const Song = bookshelf.Model.extend({
  tableName: 'songs',
  findAllSongs: (id) => {
      return this.forge({ id })
        .fetchAll()
        .then((songs) => {
          console.log('song model, getting all the songs: ', songs)
          return songs
        })
        .catch((err) => {
          console.log("error when no email", err)
          return err
        })
    }


})

module.exports = Song;
