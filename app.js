'use strict'
require('dotenv').config();
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session= require('express-session');
const passport = require('passport');
const knexSessionStore = require('connect-session-knex')(session);
const { knex } = require('./db/database');

const routes = require('./routes/');
