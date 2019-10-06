/**
 * Configure your Gatsby site with this file.
 */

module.exports = {
  siteMetadata: {
    title: "Micro Geopolítica do Rio de Janeiro",
    description:
      "Micro Geopolítica do Rio de Janeiro. A cidade e seus domínios territoriais. Facções criminosas por favelas. Esse site parte do desejo de ver o Estado do Rio de Janeiro retomando o controle territorial de sua geografia e libertando brasileiros do julgo das facções criminosas e da violência",
    author: "O_Reina, Felipe Reina",
    twitterUsername: "@O_Reina",
    image:"/rio.jpg",
    siteUrl:"https://riogeopolitica.netlify.com"
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-playground`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: "https://riogeopolitica.netlify.com",
        sitemap: "https://riogeopolitica.netlify.com/sitemap.xml",
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
  ]
}
