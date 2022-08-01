'use strict';

const express = require('express');

const server = express();

const cors = require('cors');

server.use(cors());

require('dotenv').config();

const weather = require('./data/weather.json');

