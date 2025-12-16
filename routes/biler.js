const express = require('express');
const router = express.Router();
const db = require('../db');
const kreverInnlogging = require('../auth.js');

router.get('/', kreverInnlogging, function(req, res) {
    const cars = db.prepare('SELECT * FROM bil').all();
    res.json(cars);
});

module.exports = router;