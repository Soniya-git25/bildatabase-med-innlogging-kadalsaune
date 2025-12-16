const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

// GET registration page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// POST register new user
router.post('/', async (req, res) => {
    const { fornavn, etternavn, epost, passord } = req.body;

    // Validate input
    if (!fornavn || !etternavn || !epost || !passord) {
        return res.status(400).json({ message: "Alle feltene er påkrevd" });
    }

    if (passord.length < 6) {
        return res.status(400).json({ message: "Passord må være minst 6 tegn" });
    }

    try {
        // Check if user already exists
        const eksisterendeBruker = db.prepare("SELECT * FROM person WHERE epost = ?").get(epost);
        if (eksisterendeBruker) {
            return res.status(409).json({ message: "En bruker med denne eposten eksisterer allerede" });
        }

        // Hash password
        const hashedPassord = await bcrypt.hash(passord, 10);

        // Insert new user into database
        const stmt = db.prepare("INSERT INTO person (fornavn, etternavn, epost, passord) VALUES (?, ?, ?, ?)");
        stmt.run(fornavn, etternavn, epost, hashedPassord);

        res.json({ message: "Du kan nå logge inn." });
    } catch (error) {
        console.error("Feil ved registrering:", error);
        res.status(500).json({ message: "En feil oppstod under registrering" });
    }
});

module.exports = router;
