module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int(HOST_PORT_1, 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});