const db = require('./db');
const {PrismaSessionStore} = require('@quixo3/prisma-session-store');
const sessionConfig = {
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',

    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    name: 'sid',
    store: new PrismaSessionStore(
        db,
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}

module.exports = sessionConfig;