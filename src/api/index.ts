import { Router } from "express";
import passport from "passport";

import authRouter from "./auth/routers";
import userRouter from "./user/routers";

const router = Router();

router.use(authRouter);
router.use(passport.authenticate("jwt", { session: false }));
router.use(userRouter);

export default router;
