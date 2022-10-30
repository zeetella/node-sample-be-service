"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
require('./src/database');
const routes = require("./src/routes");

const initializeServer = async () => {
  const server = Hapi.server({
    port: 4000,
    host: "localhost",
  });

  const swaggerOptions = {
    info: {
      title: "Training Sessions",
      version: "1.0.0",
    },
    grouping: 'tags'
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options:  swaggerOptions,
    },
  ]);
  

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initializeServer();
