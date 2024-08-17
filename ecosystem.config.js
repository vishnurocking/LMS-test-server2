module.exports = {
  apps: [
    {
      name: "lms-server-dev",
      script: "npm",
      args: "run dev",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 8000,
      },
    },
    {
      name: "lms-server-prod",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
    },
  ],
};
