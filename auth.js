const express = require('express');
const session = require('express-session');

function kreverInnlogging(req, res, next) {
    if(!req.session || !req.session.bruker) {
        // For API-kall, returner JSON
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(401).json({ message: "Du må være innlogget for å få tilgang" });
        }
        // For HTML-sider, redirect til login
        return res.redirect('/login');
    }
    next();
}

module.exports = kreverInnlogging;