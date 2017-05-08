'use strict'

const Song = require('../models/Songs');
const { knex } = require('../db/database');

module.exports.createSong = ( { body }, res, err) => {
  Song.forge(body).
  save()
  .then((songObj) => {
    res.status(201).json(msg: "your song was added!")
    .catch((err) => {
      console.log("songctrl createsong err", err)
      return err
    })

  })
} //end createSong

module.exports.deleteSong = ({params: {id}}, res, err) => {
  Song.forge({id}).
  destory()
  .then( (song) => {
    res.status(200).json( msg: 'song deleted')
  })
  .catch((err) => {
    consol.log('delete song in Song ctrl', err)
    return err
  })
}

module.exports.getAllSongs = ({ params: {id}}, res, err) => {
  Song.forge({id})
  .fetchAll()
  .then((usersSongs) => {
    console.log("you got the songs", usersSongs)
    return usersSongs
  })
  .catch((err) => {
    console.log("you did not get the users songs", err)
    return err
  })
}
