/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "../preset.js",
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],

  features: {
    interactionsDebugger: true
  },

  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
};
export default config;
