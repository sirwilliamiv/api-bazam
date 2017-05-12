'use strict'

const Song = require('../models/Songs');
const { knex } = require('../db/database');
const ACRCloud = require( 'acr-cloud' );


module.exports.createSong = ( { body }, res, err) => {
  Song.forge(body)
  .save()
  .then((songObj) => {
    res.status(201).json({ msg: "your song was added!"})
    .catch((err) => {
      console.log("songctrl createsong err", err)
      return err
    })

  })
} //end createSong

module.exports.deleteSong = ({params: {id}}, res, err) => {
  Song.forge({id}).
  destroy()
  .then( (song) => {
    console.log("song deleted info", song)
    res.status(200).json({ msg: 'song deleted'})
  })
  .catch((err) => {
    console.log('delete song in Song ctrl', err)
    return err
  })
}
//get all songs by user
module.exports.getAllSongs = ({ params: {id}}, res, err) => {
  Song.forge({id})
  .fetchAll()
  .then((usersSongs) => {
    console.log("you got the songs", usersSongs)
    return  res.status(200).json({ msg: 'user added successfully!',
      usersSongs } )
  })
  .catch((err) => {
    console.log("you did not get the users songs", err)
    return err
  })
}
