const {createUser, getUserByEmail, checkUserCredentials} = require('../models/user');

module.exports.getSignup = (req,res) => {
    res.render('signup');
}


module.exports.postSignup = async (req,res) => {
    const {email, password} = req.body;

    const newUser = await createUser(email, password);

    if(!newUser){
        res.redirect('/auth/signup');
    }
    res.redirect('/auth/login');
}


module.exports.getLogin = (req,res) => {
    res.render('login');
}

module.exports.postLogin = async (req,res) => {
    const {email, password} = req.body;

   const user = await getUserByEmail(email);

   if(!user) res.redirect('/auth/login') //To do: Send flash message

   const validCredentials = await checkUserCredentials(user, password);

   if(validCredentials){
       req.session.regenerate(()=>{
           req.session.user = user;
           req.session.save(() => {
               res.redirect('/notes')
           });
       });
   }else{
       res.redirect('/auth/login')
   }

}

module.exports.logout = (req,res) => {
    console.log('logout ran')
    if(req.session){
        req.session.destroy();
        res.clearCookie('sid');
    }

    res.redirect('/auth/login');
}