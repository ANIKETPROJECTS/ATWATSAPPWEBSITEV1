const fs = require("node:fs");
const path = require("node:path");

const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

module.exports = {
  apps: [
    {
      name: "atwassup",
      cwd: __dirname,
      script: path.join(__dirname, "artifacts/api-server/dist/index.mjs"),
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3025",
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        SMTP_HOST: process.env.SMTP_HOST || "smtp.hostinger.com",
        SMTP_PORT: process.env.SMTP_PORT || "465",
        SMTP_USER: process.env.SMTP_USER || "info@atwassup.com",
        SMTP_PASS: process.env.SMTP_PASS || "",
        LEAD_INBOX: process.env.LEAD_INBOX || "info@atwassup.com",
      },
    },
  ],
};
