module.exports = {
  siteMetadata: {
    title: `Blaine Lewis`,
    description: `Blaine Lewis is a second year PhD student at the University of Toronto, this is his personal website. You can find his publications, demos and more here.`,
    author: `@blainelewis1`,
    baseUrl: "http://blainelewis.ca",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `publications`,
        path: `${__dirname}/content/publications`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // defaultLayouts: {
        //   publications: require.resolve("./src/templates/publication.js"),
        //   // default: require.resolve("./src/templates/publication.js"),
        //   default: require.resolve("./src/pages/publication.js"),
        // },
        // extensions: [".mdx", ".md"],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-page-creator`,
    //   options: {
    //     path: `${__dirname}/content/publications`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blaine Lewis`,
        short_name: `Blaine Lewis`,
        description: `Blaine Lewis is a first year PhD student at the University of Toronto, this is his personal website. You can find his publications, demos and more here.`,
        lang: `en`,
        icon: `src/squiggle-favicon.svg`,
        start_url: `/`,
        background_color: `#d95204`,
        theme_color: `#fff`,
      },
    },
  ],
}
