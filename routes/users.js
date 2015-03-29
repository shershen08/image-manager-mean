var debug = require('debug')('http');
var express = require('express');
var router = express.Router();

var usersJSON = require("../json-static/users.json");

/* GET users listing. */
router.get('/', function(req, res) {

    debug('//////////////////////// GET users in users.js ///////////////////////');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(usersJSON));
    next();
});

module.exports = router;