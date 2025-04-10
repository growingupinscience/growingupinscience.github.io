module.exports = {
  siteMetadata: {
    title: `Growing Up in Science`,
    siteUrl: `https://www.growingupinscience.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
      
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          // Remove gatsby-remark-custom-blocks plugin
          // {
          //   resolve: "gatsby-remark-custom-blocks",
          //   options: {
          //       blocks: {
          //           snippet: {
          //             classes: "snippet"
          //           },
          //           snippetafter:{
          //             classes: "snippetafter"
          //           },
          //           danger: {
          //             classes: "danger",
          //           },
          //       },
          //   },
          // }
        ],
      },
    },
  ],
  pathPrefix: "/",
}
