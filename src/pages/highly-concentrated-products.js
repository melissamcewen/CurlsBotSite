import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'



const Shea = () => (
  <div>
    <Helmet
      title="Curly Girl Product Concentrations"
      meta={[
        { name: 'description', content: 'We tested these products to see how much to use' },
        { name: 'keywords', content: 'products, curly girl, low porosity, product application, fine hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>Too Much Product? Why Product Concentration Matters</h1>
    <p>So you have a new hair product and you're so excited to use! But you don't know how much to use, so you put in a glob. Your hair dries and you find out it's a producty filmy greasy mess. I can't tell you how often that has happened to me. The problem? Many products are VERY concentrated. If you have fine, short, low-porosity, or low density hair – or some combo of the above, you only need to use a tiny amount.</p>
    <p>How tiny? Start with a dime size glob and work up. Mix the tiny glob with a little warm water in your hands to allow for the best distribution. Focus on your ends. The advantage of these products is they will last a long time.</p>
    <p>How can you tell if a product is concentrated? Well check out our list. If it's not on the list, some ways to know are to contact the manufacturer. Often gels, custards, and things labeled "curl enhancers" are highly concentrated. Mousses/foams are unlikely to be highly concentrated, which makes them a lot easier to use.</p>

    <h2>A List of Highly Concentrated Products</h2>
    <p>The following products I've tried and confirmed are very highly concentrated. For my medium density fine low porosity hair I use at most a nickel size amount:</p>
    <ul>
      <li>Moptop <ReactGA.OutboundLink eventLabel="http://amzn.to/2kNlZhU" to="http://amzn.to/2kNlZhU" target="_blank">Curly Hair Custard </ReactGA.OutboundLink></li>
      <li>Moptop <ReactGA.OutboundLink eventLabel="http://amzn.to/2tQlyYh" to="http://amzn.to/2tQlyYh" target="_blank">Medium Hold Gel </ReactGA.OutboundLink></li>


    </ul>


    
  </div>
)

export default Shea
