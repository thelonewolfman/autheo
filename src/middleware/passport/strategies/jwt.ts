import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "config";

import { User } from "../../../api/user/models";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
  secretOrKey: config.get("JWT_SECRET")
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    let user = await User.findById(payload.sub);

    if (!user) return done(null, false);

    return done(null, user);
  })
);
