module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["../preset.js", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  features: {
    interactionsDebugger: true
  },
  docs: {
    autodocs: true
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
};
