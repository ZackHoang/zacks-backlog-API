require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromBodyField("jwt"),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
        if (!user) {
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: "Incorrect username and/or password",
          });
        }
        req.jwt = jwt.sign({ user }, process.env.SECRET);
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

passport.use(
  new JWTStrategy(jwtOpts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.id,
        },
      });
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }),
);

const response = (req, res) => {
    res.json({
      user: req.user,
      jwt: req.jwt,
    });
};

exports.logIn = [
  (req, res, next) => {
    passport.authenticate(
      ["local", "jwt"],
      (err, user) => {
        if (err) {
          return next(err);
        } else {
          req.logIn(user, { session: false }, next);
        }
      },
    )(req, res);
  },
  response
];
