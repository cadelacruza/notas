const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./config/session');

const authRouter = require('./routes/authRouter');
const noteRouter = require('./routes/noteRouter');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session(sessionConfig))

app.use((req,res,next) => {
    console.log(req.url);
    console.log(req.method);
    next();
})

app.use('/auth/', authRouter);
app.use('/notes/', noteRouter);
app.get('*',function (req, res) {
    res.redirect('/notes');
});

app.listen(PORT, console.log('Server ready at', PORT));