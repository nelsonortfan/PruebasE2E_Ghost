const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true,
  env: {
    ghost_url: "http://localhost:2369/ghost",
  },
});
