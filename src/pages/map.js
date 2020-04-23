import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'


const hardWater = () => (
  <div>
    <Helmet
      title="Map Method Review"
      meta={[
        { name: 'description', content: 'Is the course worth is?' },
        { name: 'keywords', content: 'map method, curly hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>My Review: Map Method</h1>
    <p>If you're <ReactGA.OutboundLink eventLabel="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" to="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" target="_blank">curly hair  </ReactGA.OutboundLink> and are frustrated with buildup even after switching to <Link to="cg-lite">lighter products</Link>, you may have hard water. </p>







  </div>
)

export default hardWater
