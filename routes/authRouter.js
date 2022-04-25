const authRouter = require('express').Router();
const auth = require('../controllers/auth');
const {alreadyLoggedIn} = require('../middleware/authorization');

authRouter.post('/logout', auth.logout);

authRouter.use(alreadyLoggedIn);
authRouter.get('/signup', auth.getSignup);
authRouter.post('/signup', auth.postSignup);
authRouter.get('/login', auth.getLogin);
authRouter.post('/login', auth.postLogin);

module.exports = authRouter;