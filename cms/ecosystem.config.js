module.exports = {
  apps: [
    {
      name: "test1",
      cwd: "/Users/komorishuhei/job/htdocs/shishanchu/cms",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "test1",
        HOST_PORT_SITE1: 1337,
        DOMAIN_URL: "localhost",
      },
    },
    {
      name: "test2",
      cwd: "/Users/komorishuhei/job/htdocs/shishanchu/cms",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "test2",
        HOST_PORT_SITE2: 1338,
        DOMAIN_URL: "localhost",
      },
    },
  ],
};
