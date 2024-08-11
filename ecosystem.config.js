module.exports = {
  apps: [
    {
      name: "lms-server",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
        ORIGIN: "http://52.66.212.191,https://www.eduhub.in",
      },
    },
  ],
};
