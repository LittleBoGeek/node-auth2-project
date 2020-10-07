const jwt = require ('jsonwebtoken')

const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
const token = req.headers.authorization.split(' ')[1];
console.log("token", token);
if(token)  {
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
            res.status(401).json({message:'Invalid or missing credentials'})        
        } else {
            req.decodedToken = decodedTokenl
            next();
        }
    });
} else {
    res.status(401).json({message:'invalid or missing credentials'})
}


}