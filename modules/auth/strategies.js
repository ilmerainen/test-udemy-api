import jwtPassport from 'passport-jwt'
import passport from 'passport'
import localStrategy from 'passport-local'
import { User } from '../../db/models/user.cjs'
import { hashPassword, isValidPassword } from './functions.js'

const JwtStrategy = jwtPassport.Strategy;
const ExtractJWT = jwtPassport.ExtractJwt;

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        username,
                    },
                });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const isValid = isValidPassword(password, user.password);

                if (!isValid) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        },
    ),
);

passport.use(
    'signup',
    new localStrategy.Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await User.create({
                    username,
                    password: hashPassword(password),
                });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        },
    ),
);

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        },
    ),
);
