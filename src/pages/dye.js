import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'


const dyePage = () => (
  <div>
    <Helmet
      title="curly hair Dye Options"
      meta={[
        { name: 'description', content: 'curly hair friendly hair dye options' },
        { name: 'keywords', content: 'products, curly hair, hair dye, sulfate-free, silicone-free, henna' },
        {
              property: 'og:image',
              content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>curly hair Dye Options </h1>
    <p>Many people want to follow the  <ReactGA.OutboundLink eventLabel="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" to="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" target="_blank">curly hair method </ReactGA.OutboundLink> but do not want to give up dying their hair. Most hair dyes contain harsh ingredients that may damage hair. In addition, many contain silicones that can deposit on your hair. Luckily there are several good options:</p>
    <h2>Pure Henna (and other herbal dyes)</h2>
    <p>Henna and other herbal dyes (indigo, cassia) are completely curl friendly. They also do not do any damage to the hair. The disadvantage is it can be hard to predict the results, there is a learning curve for using them, and the color options are more limited.</p>

    <p>That said, I have personally switched to henna and love it. I use an "auburn" mix that doesn't look too far off from my natural color. It leaves my hair shiny and healthy and I only need to dye every 4-6 months. Some people report that their curls are altered by henna, but I haven't found this to be the case.</p>
    <p>Some curl specific henna tips</p>
    <ul>
      <li>Check your ingredients! Most henna on the market is adulterated with harsh ingredients. Purchase from a reputable pure henna brand like <ReactGA.OutboundLink eventLabel="http://www.ancientsunrise.com/default.asp0" to="http://www.ancientsunrise.com/default.asp" target="_blank">Ancient Sunrise</ReactGA.OutboundLink>.</li>
      <li>Always clarify before doing henna with a low-poo like  <ReactGA.OutboundLink eventLabel="http://amzn.to/2kLT3H0" to="http://amzn.to/2kLT3H0" target="_blank">Kinky Curly Come Clean</ReactGA.OutboundLink>. If you do not do this, the dye may not work. In addition if you have hard water you may want to do a special treatment to remove the stains hard water can leave. For that like Ion Hard Water Shampoo or  <ReactGA.OutboundLink eventLabel="http://www.mehandi.com/product-p/rain_01.htm" to="http://www.mehandi.com/product-p/rain_01.htm" target="_blank">Rainwash</ReactGA.OutboundLink></li>
      <li>Consider using protein-free products if you use henna since it essentially also acts as a protein treatment. </li>
      <li>Do your research! <ReactGA.OutboundLink eventLabel="https://www.ancientsunrise.blog/henna-hair-book/" to="https://www.ancientsunrise.blog/henna-hair-book/" target="_blank">Ancient Sunrise has a great online book you should read before trying henna.</ReactGA.OutboundLink>.</li>
    </ul>

    <h2>Chemical Dyes</h2>
    <p>All chemical dyes contain para-phenylenediamine which damage the hair. If you chose this, you can mitigate the damage by chosing the right products for caring for your hair afterwards.</p>

     <h3>Silicone Free Dyes</h3>
     <p>I used <ReactGA.OutboundLink eventLabel="http://amzn.to/2CqupQc" to="http://amzn.to/2CqupQc" target="_blank">Herbatint</ReactGA.OutboundLink> and <ReactGA.OutboundLink eventLabel="http://amzn.to/2CVSXla" to="http://amzn.to/2CVSXla" target="_blank">Naturtint</ReactGA.OutboundLink> before switching to Henna and it does not contain silicones.</p>

    <p>If your hair dye contains silicones and you don't want to switch away, you can clarify with a silicone-removing shampoo like <ReactGA.OutboundLink eventLabel="http://amzn.to/2kLT3H0" to="http://amzn.to/2kLT3H0" target="_blank">Kinky Curly Come Clean</ReactGA.OutboundLink> after dying.</p>

    <h3>Repair options after chemical dyes</h3>
    <p>Many curly folks swear by <a href="https://www.naturallycurly.com/curlreading/ingredients/olaplex-according-to-the-hair-pros">Olaplex</a> for restoring the hair after chemical dyes. Also para-phenylenediamine makes the hair more high porosity so you may want to switch to higher porosity products.</p>


  </div>
)

export default dyePage
