const { expressjwt: ejwt } = require('express-jwt');


const headersToken = (req) => {
    const { authorization } = req.headers;
    if (!authorization) return null;

    const [type, token] = authorization.split(' ');
    if (type === 'Bearer') return token;

    return null;
}

const authenticated = ejwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: headersToken,
});


module.exports = {
    authenticated,
};
