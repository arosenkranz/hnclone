import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents: require("dd-trace/ci/cypress/plugin"),
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
