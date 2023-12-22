import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  // This is required to make use of the React 17+ JSX transform.
  jsxRuntime: "automatic",
  pathPrefix: "/farcaster-snap-site",
  plugins: [
    "gatsby-plugin-svgr",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Farcaster Snap",
        icon: "src/assets/logo.svg",
        /* eslint-disable @typescript-eslint/naming-convention */
        theme_color: "#6F4CFF",
        background_color: "#FFFFFF",
        /* eslint-enable @typescript-eslint/naming-convention */
        display: "standalone",
      },
    },
  ],
};

export default config;
