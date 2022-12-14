const Joi = require("joi");
const userRoutes = require("./userRoutes.js");

const routes = [
  {
    method: "GET", //GET, POST, PUT, DELETE, PATCH, OPTIONS
    path: "/",
    options: {
      handler: (request, h) => {
        console.log(request.auth.credentials.userId);
        return "Hello World! 123";
      },
      auth: {
        strategy: "jwt",
        scope: [ "ADMIN"],
      },
      description: "This is description",
      notes: "this is notes",
      tags: ["api"], // ADD THIS TAG
      validate: {},
      // validate: {
      //     params: Joi.object({
      //         id : Joi.number()
      //                 .required()
      //                 .description('the id for the todo item'),
      //     })
      // }
    },
  },
];

module.exports = routes.concat(userRoutes);
