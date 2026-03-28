export default {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  viteFinal: async (config) => {
    return {
      ...config,
      base: '/advanced-ui-components/',
    };
  },
};
