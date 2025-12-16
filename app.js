const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const personerRouter = require('./routes/personer');
const bilerRouter = require('./routes/biler');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const beskyttetRouter = require('./routes/beskyttet');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personer', personerRouter);
app.use('/biler', bilerRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/beskyttet', beskyttetRouter);

// Logout rute
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Feil ved utlogging" });
        }
        res.json({ message: "Utlogging vellykket" });
    });
});

module.exports = app;
