const express = require('express');
const router = express.Router();
const db = require('../db');
const kreverInnlogging = require('../auth.js');

router.get('/', kreverInnlogging, function(req, res) {
    const users = db.prepare('SELECT * FROM person').all();
    res.json(users);
});

module.exports = router;