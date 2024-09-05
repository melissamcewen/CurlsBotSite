import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'


const hpPage = () => (
  <div>
    <Helmet
      title="High Porosity Products"
      meta={[
        { name: 'description', content: 'Products to nourish damaged, dry, and moisture hungry hair' },
        { name: 'keywords', content: 'products, high porosity, dry hair, curly hair' },
      ]}
    />
    <h1>High Porosity Recs </h1>
    <p>If you're <ReactGA.OutboundLink eventLabel="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" to="https://www.wikihow.com/Follow-the-Curly-Girl-Method-for-Curly-Hair" target="_blank">curly hair  </ReactGA.OutboundLink> and have high porosity hair, you need a lot of nourishment. Often high porosity hair is:</p>
      <ul>
        <li>Previously chemically processed</li>
        <li>Constantly dry</li>
        <li>Looks dull</li>
      </ul>

      <p>The advantage over low porosity hair is there are so many great products out there that it's hard to just recommend a few, so instead of recommending lines, I'm recommending types of products. For best results you'll want one of each:</p>
      <ul>
        <li>Cowash</li>
        <li>Deep Conditioner</li>
        <li>Nourishing styler</li>
        <li>Lock in styler</li>

      </ul>

      <h2>Cleansing Conditioner/Cowash</h2>
      <p>If you have high porosity hair you will want to use the gentlest type of cleansing, which is a cleansing conditioner, AKA a "cowash" </p>
      <ul>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2AOMveD" to="http://amzn.to/2AOMveD" target="_blank"> Innersense Hydrating Hairbath $$$</ReactGA.OutboundLink></li>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2APlGqw" to="http://amzn.to/2APlGqw" target="_blank"> Shea Moisture Coconut & Hibiscus Co-Wash Conditioning Cleanser $$</ReactGA.OutboundLink></li>
        <li>TRESemmé Expert Selection Conditioner, Botanique Nourish and Replenish $ - a budget drugstore option, yes you can use a regular conditioner, but you might be a bit more prone to buildup.</li>
      </ul>


      <h2>Deep Conditioner</h2>
      <p>Once a week or more you'll want to follow your cowash with a deep conditioner to help your hair retain moisture.</p>
      <ul>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2yjPKrn" to="http://amzn.to/2yjPKrn" target="_blank"> Jessicurl Deep Conditioning Treatment $$$</ReactGA.OutboundLink></li>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2BXgjox" to="http://amzn.to/2BXgjox" target="_blank">Shea Moisture Manuka Honey & Mafura Oil Intensive Hydration Treatment $$</ReactGA.OutboundLink></li>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2BYl8ht" to="http://amzn.to/2BYl8ht" target="_blank">Coconut Oil $</ReactGA.OutboundLink></li>
      </ul>



      <h2>Nourishing Styler</h2>
      <p>A nourshing styler helps further nourish your hair. Most of these are classified as milks, creams, or leave ins. </p>
     <ul>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2yjHQ1r" to="http://amzn.to/2yjHQ1r" target="_blank"> Innersense Sweet Spirit Leave-In Conditioner $$$</ReactGA.OutboundLink></li>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2APaD0N" to="http://amzn.to/2APaD0N" target="_blank">Shea Moisture Coconut & Hibiscus Curl & Style Milk $$</ReactGA.OutboundLink></li>
        <li>Garnier Fructis Curl Sculpting Cream Gel $- CAUTION earlier formulations contain dimethicone, so make sure you're getting the new one by checking the ingredient list</li>
      </ul>


      <h2>Lock in styler</h2>
      <p>Lock in stylers help your curls/waves hold and also to lock in moisture.</p>
       <ul>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2kK7lb3" to="http://amzn.to/2kK7lb3" target="_blank"> MopTop Anti-frizz Medium Hold Gel $$$ </ReactGA.OutboundLink></li>
        <li><ReactGA.OutboundLink eventLabel="http://amzn.to/2AwkkEe" to="http://amzn.to/2AwkkEe" target="_blank">Giovanni LA Natural Gel $$</ReactGA.OutboundLink></li>
        <li> <ReactGA.OutboundLink eventLabel="http://amzn.to/2zTIvbs" to="http://amzn.to/2zTIvbs" target="_blank">Aussie Instant Freeze Gel $ </ReactGA.OutboundLink></li>
      </ul>






  </div>
)

export default hpPage
