const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try { 

        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();

    } catch(e) {
        
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired' });
        }

        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    
        res.status(401).json({message: 'Not authorized'});
    }
}