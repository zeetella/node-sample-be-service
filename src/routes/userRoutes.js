const Joi = require("joi");
const userHandlers = require("../handlers/userHandlers");
const userRoutes = [
  {
    method: "POST", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user",
    options: {
      handler: userHandlers.createUser,
      description: "This is the endpoint to create a user",
      notes: "email should not be used before",
      tags: ["api", "user"], // ADD THIS TAG
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .email()
            .default("a@b.com")
            .description("user email")
            .required(),
          firstName: Joi.string()
            .default("John")
            .description("user first name")
            .min(2)
            .max(50)
            .required(),
          lastName: Joi.string()
            .default("Doe")
            .description("user last name")
            .min(2)
            .max(50)
            .required(),
          password: Joi.string().default("123456"),
        }),
      },
    },
  },
  {
    method: "POST", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user/login",
    options: {
      handler: userHandlers.login,
      description: "This is the endpoint to login a user",
      notes: "email should not be used before",
      tags: ["api", "user"], // ADD THIS TAG
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string()
            .email()
            .default("a@b.com")
            .description("user email")
            .required(),
          password: Joi.string().default("123456"),
        }),
      },
    },
  },
  {
    method: "PUT", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user/{id}",
    options: {
      handler: userHandlers.updateUser,
      description: "This is the endpoint to update a user",
      notes: "email should not be used before",
      tags: ["api", "user"], // ADD THIS TAG
      validate: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .description('the id for the user'),
        }),
        payload: Joi.object({
          email: Joi.string()
            .email()
            .default("a@b.com")
            .description("user email")
            .required(),
          firstName: Joi.string()
            .default("John")
            .description("user first name")
            .min(2)
            .max(50)
            .required(),
          lastName: Joi.string()
            .default("Doe")
            .description("user last name")
            .min(2)
            .max(50)
            .required(),
        }),
      },
    },
  },
  {
    method: "GET", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/users",
    options: {
      handler: userHandlers.getAllUsers,
      description: "This is the endpoint to get all  users",
      notes: "notes",
      tags: ["api", "user"], // ADD THIS TAG
      validate: {},
    },
  },
  {
    method: "GET", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user/{id}",
    options: {
      handler: userHandlers.getUserById,
      description: "This is the endpoint to get user by id",
      notes: "this is the notes",
      tags: ["api", "user"], // ADD THIS TAG
      validate: {
        params: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().description('the id for the user'),
        }),
      },
    },
  },
];


module.exports = userRoutes;