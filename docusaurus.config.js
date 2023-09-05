// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "leeyoonsu-blog",
  tagline: "leeyoonsu-blog",
  favicon: "favicon.ico",
  trailingSlash: false,

  // Set the production url of your site here
  url: "https://blog.leey00nsu.site",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "leey00nsu", // Usually your GitHub org/user name.
  projectName: "blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,

        blog: {
          id: "blog",
          routeBasePath: "/blog",
          blogSidebarTitle: "모든 글",
          blogSidebarCount: "ALL",

          showReadingTime: true,
          // postsPerPage: 1,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "article",
        blogSidebarTitle: "모든 글",
        blogSidebarCount: "ALL",

        showReadingTime: true,

        routeBasePath: "article",

        path: "./article",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "LEEYOONSU 블로그",
        logo: {
          alt: "LEEYOONSU 블로그 로고",
          src: "img/logo.png",
        },
        items: [
          { to: "/blog", label: "블로그", position: "left" },
          {
            to: "/article",
            label: "생각들",
            position: "left",
          },
          { to: "/blog/tags", label: "태그", position: "right" },
          {
            href: "https://github.com/leey00nsu",
            label: "GitHub",
            position: "right",
          },
        ],
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
