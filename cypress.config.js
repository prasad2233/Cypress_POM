const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  watchForFileChanges: false,
  experimentalStudio: true,
  video:true,
  projectId: "8j5gf9",
  viewportHeight: 1080,
  viewportWidth: 1920
});
