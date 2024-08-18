module.exports = {
  apps: [
    {
      name: "lms-server",
      script: "npm",
      args: "start",
      watch: true,
      env: {
        PORT: 8000,
      },
    },
  ],
};
