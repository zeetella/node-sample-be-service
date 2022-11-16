require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Jwt = require("@hapi/jwt");
require("./src/database");
const routes = require("./src/routes");
const CONFIGS = require("./src/configs/configs");

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
    grouping: "tags",
  };

  await server.register([
    Jwt,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.auth.strategy("jwt", "jwt", {
    keys: CONFIGS.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: true,
      //maxAgeSec: 14400, // 4 hours
      //timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      userId = artifacts.decoded.payload.sub;
      //can validate from database
      return {
        isValid: true,
        userId: artifacts.decoded.payload.sub,
        credentials: { userId: artifacts.decoded.payload.sub, scope: artifacts.decoded.payload.scope },
      };
    },
  });

  server.auth.default('jwt');

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initializeServer();
