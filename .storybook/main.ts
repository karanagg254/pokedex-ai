import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Add TypeScript support
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: { transpileOnly: true },
        },
      ],
    });

    // ✅ Add SCSS/Sass support
    config.module?.rules?.push({
      test: /\.s[ac]ss$/i,
      use: [
        require.resolve("style-loader"),
        require.resolve("css-loader"),
        require.resolve("sass-loader"),
      ],
    });

    config.resolve?.extensions?.push(".ts", ".tsx", ".scss");
    return config;
  },
};
export default config;
