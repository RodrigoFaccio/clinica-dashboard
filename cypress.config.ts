import { defineConfig } from "cypress";

export default defineConfig({

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: ["src/**/**/*.test.{js,jsx,ts,tsx}", "src/**/*.test.{js,jsx,ts,tsx}"],
  },

});
