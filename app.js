'use strict'
require('dotenv').config();
const express =require('express');
const app = express();
const { knex } = require('./db/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const flash = require('express-flash');
const session= require('express-session');
const passport = require('passport');
const knexSessionStore = require('connect-session-knex')(session);
const routes = require('./routes/');
// const routes = require('./routes/');
app.use(bodyParser.json())
app.use('/api/v1/', routes);
app.use(cookieParser('bazamsecrets'));
app.use(session({cookie: {maxAge: 70000, secret: 'bazamsecrets', resave: true, saveUnitialized: false }}));
app.use(bodyParser.urlencoded({extended: false}));
//save user
app.use(session({
  store: new knexSessionStore({
    knex,
    tablename:'sessions'
  }),
  resave:false,
  saveUnitialized: false,
  secret: process.env.SESSION_SECRET || 'bazamsupersecret'
}))

// require('./lib/passport-strategies')

app.use(passport.initialize());
app.use(passport.session());

// app.use(routes);


//404 catch here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
