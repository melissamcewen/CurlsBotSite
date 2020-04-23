import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'


const hardWater = () => (
  <div>
    <Helmet
      title="Hard Water + Curly Hair"
      meta={[
        { name: 'description', content: 'Your oily scalp on curly hair might be caused by hard water' },
        { name: 'keywords', content: 'products, hard water, buildup curly hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>Hard Water + Curly Hair </h1>
    <p>If you're <ReactGA.OutboundLink eventLabel="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" to="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" target="_blank">following a curly hair method  </ReactGA.OutboundLink> and are frustrated with buildup even after switching to <Link to="cg-lite">lighter products</Link>, you may have hard water. </p>

    <h2>What is hard water?</h2>
    <p><a href="https://en.wikipedia.org/wiki/Hard_water">Hard water</a> has high mineral content. You know you have hard water if you get white buildup on things like faucets or tea kettles. Or you get lots of soap scum in the tub or shower that's hard to scrub off. <a href="http://homewater101.com/articles/hard-water-across-us">Check out this map of the USA, most states seem to have pretty hard water</a> If you're in doubt, <ReactGA.OutboundLink eventLabel="http://amzn.to/2CufGmr" to="http://amzn.to/2CufGmr" target="_blank">you can order hard water test strips.</ReactGA.OutboundLink> </p>
    <p>On your hair it can combine with your natural oils from your scalp and hair products to form an oily soap scum like film on your hair. Even sulfate shampoo can have trouble breaking this up.</p>

    <h2>My hard water story</h2>
    <p>So I went on vacation with some new product samples from Moptop and Jessicurl and they worked amazing! But when I got home, they suddenly turned my hair into a limp mess. I could feel gross oily areas near my roots.</p>
    <p>I didn't know what to do, I tried sulfate shampoo and the oily spots persisted. Someone pointed out that since the thing that changed was the location, it might be the water. I did a hard water treatment and my curls bounced right back!  </p>

    <h2>My routine</h2>
    <h3>Acidic clarifying treatment </h3>
    <p>There is a lot of mixed messages online about the best way to remove the deposits. I did try sulfates, it did not work. I got the best results from an acidic treatment. I used the  <ReactGA.OutboundLink eventLabel="http://amzn.to/2HrewMd" to="ttp://amzn.to/2HrewMd" target="_blank">Malibu C Demineralizer treatment.</ReactGA.OutboundLink> This can be a bit harsh so I only use it once a month. Some people also use Ion Crystal Clarifying Treatment (available at Sally's), vinegar, or other <a href="http://science-yhairblog.blogspot.com/2016/03/hard-water-and-your-hair.html">DIY conconctions.</a></p>
    <h3>Hard water shampoo</h3>
    <p>I try to wash my hair as little as possible to limit the need for clarifying. When I do wash, I use a sulfate-free hard-water shampoo called  <ReactGA.OutboundLink eventLabel="http://amzn.to/2FaYdCp" to="http://amzn.to/2FaYdCp" target="_blank">Malibu Hard Water</ReactGA.OutboundLink> (you can get Ion Hard Water at Sally's which is a cheaper dupe). It contains an ingredient (EDTA) that claims to reduce the ability of minerals to buildup. </p>

    <h3>Avoid Roots</h3>
    <p>I avoid getting styling products and conditioner at the roots as much as possible.</p>

    <h3>Avoid buildup-causing products</h3>
    <p>I had to ditch any cleansers with anything that could cause buildup. They are the worst problem because you use them directly on your scalp. Avoid cleansers with oils, guar gum, and polyquats. For me one of the worst culpruits it seems was my Broo Thickening Shampoo, I suspect the gums mixed with the hard water to produce a residue. </p>

    <h2>Other options</h2> 
    <h3>Shower filter</h3>
    <p>Shower filters do not soften water completely, but do remove some of the minerals. <ReactGA.OutboundLink eventLabel="http://amzn.to/2CwM9bJ" to="http://amzn.to/2CwM9bJ" target="_blank">AquaBliss High Output Universal Shower Filter with Replaceable Multi-Stage Filter Cartridge </ReactGA.OutboundLink> is a popular choice. </p>
    <h3>Water softener</h3>
      <p>These tend to be more expensive. You can install a whole-house one but the simplest one is the  <ReactGA.OutboundLink eventLabel="https://watersticks.com/" to="https://watersticks.com/" target="_blank">ShowerStick </ReactGA.OutboundLink> which is about $200.</p>






  </div>
)

export default hardWater
