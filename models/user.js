const db = require('../config/db');

//Helper packages
const bcrypt = require('bcryptjs');

// To do: validate and snitize inputs
const createUser = async (email, password) => {

    const passwordHash = await bcrypt.hash(password, 10);
    const newUSer = await db.user.create({
        data:{
            email,
            passwordhash: passwordHash
        }
    });

    return newUSer
}


const getUserByEmail = async (email) => {
    const user = await db.user.findUnique({
        where:{
            email
        }
    });

    return user;
}


const checkUserCredentials = async (user, password) => {
    const passwordInDb = user['passwordhash'];
    const valid = await bcrypt.compare(password, passwordInDb);
    
    return valid;
}

module.exports = {createUser, getUserByEmail, checkUserCredentials};