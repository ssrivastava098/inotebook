const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; //Secret JWT string coming from environment variable

const fetchUser = (req, res, next)=> {
    //This function will be used everywhere login is required. It will fetch the userID from the JWT token and add it to the request body
    const token = req.header("auth-token"); //Whenever the request is sent, it will contain the JWT token in the header by the name of auth-token
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user= data.user;
        next(); //This will run the next function.
    } catch (error) { //If invalid token
        res.status(401).send({error: "Please authenticate using valid token"})
    }
}

module.exports = fetchUser;