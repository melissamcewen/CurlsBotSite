module.exports = {
  siteMetadata: {
    title: `CurlsBot`,
    siteUrl: `https://www.curlsbot.com`,

  },
  plugins: [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "CurlsBot",
      short_name: "Curlsbot",
      start_url: "/",
      background_color: "#E7D467",
      theme_color: "#E7D467",
      display: "minimal-ui",
      icon: "src/images/icon.png"
    }
  },
  'gatsby-plugin-offline'

  ],
}
 