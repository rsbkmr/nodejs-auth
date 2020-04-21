import Joi from "@hapi/joi";

const registerValidator = (user) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(user);
};

const loginValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(user);
};

export { registerValidator, loginValidator };
