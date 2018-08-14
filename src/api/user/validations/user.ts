import Joi, { ValidationError } from "joi";

const bodySchema = {
  username: Joi.string(),
  password: Joi.string(),
  roles: Joi.array()
    .items(
      Joi.string()
        .label("roles")
        .valid("admin", "user")
    )
    .required()
};

const querySchema = {
  username: Joi.string(),
  password: Joi.string(),
  roles: Joi.array().items(
    Joi.string()
      .label("roles")
      .valid("admin", "user")
  )
};

export const validateReq = (
  obj: any,
  type: string = "body"
): ValidationError => {
  const { error } = Joi.validate(
    obj,
    type === "query" ? querySchema : bodySchema
  );
  return error;
};
