const Joi = require("joi");
const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const userRoutes = [
  {
    method: "POST", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user",
    options: {
      handler: (request, h) => {
        UserModel.create(request.payload);
        return {
          message: "User created successfully",
        };
      },
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
        }),
      },
    },
  },
  {
    method: "PUT", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/user/{id}",
    options: {
      handler: (request, h) => {
        UserModel.findByIdAndUpdate(request.params.id, request.payload).exec();
        return {
          message: "User updated successfully",
        };
      },
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
      handler: (request, h) => {
        return UserModel.find({});
      },
      description: "This is the endpoint to get all  users",
      notes: "notes",
      tags: ["api", "user"], // ADD THIS TAG
      validate: {},
    },
  },
];


module.exports = userRoutes;