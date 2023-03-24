const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      credentials: {
        username: "gary.cole@example.com",
        password: "pAssw0rd",
      },
    },
  },
});