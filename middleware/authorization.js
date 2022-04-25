const loginRequired = (req,res, next) => {
    if(!req.session.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}

const alreadyLoggedIn = (req,res, next) => {
    if(req.session.user){
        res.redirect('/notes');
    }else{
        next();
    }
}


module.exports ={loginRequired, alreadyLoggedIn}