import _ from "lodash";
import { RequestHandler } from "express";

import { User } from "../models";
import { validateReq } from "../validations";

const readAll: RequestHandler = async (req, res) => {
  const { page = 1, limit = 10, sort, order, ...rest } = req.query;

  const error = validateReq(rest, "query");
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const [count, users] = await Promise.all([
      User.find(rest).countDocuments(),
      User.find(rest)
        .skip((page - 1) * limit)
        .limit(+limit)
        .sort({ [sort]: order === "ASC" ? 1 : -1 })
        .select("-password")
    ]);

    res
      .header("X-Total-Count", count.toString())
      .status(200)
      .json(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createOne: RequestHandler = async (req, res) => {
  const error = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await new User({ ...req.body }).save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const readOne: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const updateOne: RequestHandler = async (req, res) => {
  const error = validateReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(_.pick(user, ["id", "username", "role"]));
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default {
  readAll,
  createOne,
  readOne,
  updateOne
};
