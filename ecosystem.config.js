module.exports = {
  apps: [
    {
      name: "Business",
      interpreter: "node_modules/.bin/babel-node",
      script: "src/server.js",
      watch: true,
      // mode_exec: "fork",
      // instances: 1,
      // autorestart: true,

      exe_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      // env_production: {
      //   NODE_ENV: "production",
      // },
    },
  ],
};
