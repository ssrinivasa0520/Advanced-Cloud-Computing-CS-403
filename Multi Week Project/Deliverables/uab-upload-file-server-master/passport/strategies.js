const JSONStrategy = require('passport-json').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const knex = require('../cknex');


const jsonStrategy = new JSONStrategy(async function verify(username, password, cb) {
    /* db.get('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, user);
        });
    }); */

    try {
        const user = await knex.first('id', 'username').from('user').where({
            username: username,
            password: password,
        });

        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }) };

        cb(null, { ...user });

    } catch (err) {
        return cb(err);
    }
});

const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    /* jwtFromRequest: function (req) {
        var token = null;
        console.log(req.cookies)
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        return token;
    }, */
    secretOrKey: process.env.JWT_SECRET
},
    async function (jwtPayload, cb) {

        try {
            const user = await knex.first('id', 'username').from('user').where({
                id: jwtPayload.id,
            });

            if (!user) { return cb(null, false, { message: 'Token is invalid.' }) };

            cb(null, { ...user });

        } catch (err) {
            return cb(err);
        }
    }
)

module.exports = {
    jsonStrategy,
    jwtStrategy
};