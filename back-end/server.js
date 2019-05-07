const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./api/auth/routes');
const expressSession = require('express-session');
const config = require('./config/index');
const cors = require('cors');

mongoose.connect(config.hostMongoose, { useNewUrlParser: true }, (error) => {
    if (error)
        throw error;

    const app = express();

    /* middleware */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(expressSession({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    /* allow other server send request */
    app.use(cors({

        origin: ['http://localhost:3000']

    }))

    /* authentication */
    app.use('/api/auth', authRouter);
    app.use('/api/notes', require('./api/notes/routes'));


    /* start server */
    app.listen(config.hostServer, (error) => {
        if (!error) {
            console.log('Server listen on port ', config.hostServer);
        }
    })


}
)