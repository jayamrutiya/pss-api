import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import env from "../config/env";
import { TYPES } from "../config/types";
import { iocContainer as Container } from "../config/container";
import { IDatabaseService } from "../interfaces/IDatabaseService";
import { Unauthorized } from "../errors/Unauthorized";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.ACCESS_TOKEN_SECRET,
};

const databaseService = Container.get<IDatabaseService>(TYPES.DatabaseService);
passport.use(
  new JwtStrategy(options, async (payload: any, done) => {
    // Get database client
    const client = databaseService.Client();

    const getUser = await client.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!getUser) {
      throw new Unauthorized("Unauthorized");
    }

    return done(null, payload);
  })
);

export default passport;
