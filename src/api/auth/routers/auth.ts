import { Router } from "express";
import passport from "passport";

import { authController } from "../controllers";

const router = Router();

const { signup, sendEmail, activateAccount, getToken } = authController;

router.route("/registration").post(signup, sendEmail);

router.route("/activation/:id").patch(activateAccount);

router
  .route("/local")
  .post(passport.authenticate("local", { session: false }), getToken);

export default router;
