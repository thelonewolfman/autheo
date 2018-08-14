import passport from "passport";
import { Strategy, IStrategyOptions } from "passport-local";

import { User } from "../../../api/user/models";

const opts: IStrategyOptions = {
  // passReqToCallback: true,
  session: false
};

passport.use(
  new Strategy(opts, async (username, password, done: any) => {
    const user = await User.findOne({ username: username });
    if (!user) return done(null, false);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false);
    return done(null, user);
  })
);
