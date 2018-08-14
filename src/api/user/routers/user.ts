import { Router } from "express";

import { userController } from "../controllers";

const router = Router();

const { readAll, createOne, readOne, updateOne } = userController;

router
  .route("/users")
  .all((req, res, next) => {
    next();
  })
  .get([readAll])
  .post([createOne]);

router
  .route("/users/:id")
  .all((req, res, next) => next())
  .get(readOne)
  .put(updateOne)
  .delete((req, res, next) => {
    res.json(req.body);
  });

export default router;
