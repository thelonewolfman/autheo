import _ from "lodash";
import { RequestHandler } from "express";

import { transporter } from "../../../mail";

import { User } from "../../user/models";

const signup: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(422).json({ message: "username already exist" });
    }

    req.user = await new User(
      _.pick(req.body, ["username", "password"])
    ).save();
    next();
  } catch (e) {
    throw e;
  }
};

const sendEmail: RequestHandler = async (req, res) => {
  const mailOptions = {
    from: "thelonewolf.init@gmail.com",
    to: "thelonewolf.init@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!"
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json(info);
  } catch (e) {
    res.json(e);
  }
};

const activateAccount: RequestHandler = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { active: true });
  next();
};

const getToken: RequestHandler = (req, res) => {
  // if (req.user.active) {
  const token = req.user.generateToken();
  return res.json({ token });
  // }
  // res.header("X-Auth-Token", token).send(_.pick(req.user, ["id", "username"]));
  // res.status(400).json(new Error("this account is not activated"));
};

export default {
  signup,
  sendEmail,
  activateAccount,
  getToken
};
