import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import cleansers from '../ingredient-data/cleansers';
import ResultListing from '../components/analyzer/resultlisting';


const Sulfates = () => (
  <div>
    <Helmet
      title="Is this detergent curly girl friendly"
      meta={[
        { name: 'description', content: 'What cleansers are gentle enough for a curly girl routine?' },
        { name: 'keywords', content: 'products, sulfates, shampoo, curly girl' },
      ]}
    />
    <h1>Is this detergent curly girl friendly?</h1>
    <p> The original <a href="http://amzn.to/2nT3w1V">"curly girl" rules pioneered by Lorraine Massey</a> only said:</p>
    <blockquote className="blockquote"><p>
    “Look for sulfate-free products only. Detergents frequently found in shampoo are sulfates such as sodium lauryl sulfate (the harshest), ammonium laureth sulfate (also harsh), and sodium laureth sulfate (harsh). Always check the ingredients list on the product to make sure none of these detergents are included.”
    </p></blockquote>
    <p>But since then most online communities devoted to the method have adopted stricter rules that forbid either ALL detergents (the co-wash only groups) or sulfates plus some other detergents.</p>
    <p>These detergents include ingredients like sodium lauryl sulfoacetate and sodium cocoyl sarcosinate. Curlsbot lists these cleansers as "caution." It's up to you to decide whether they are right for your hair or not. Hair that's low porosity might be fine with these, but they might dry out hair that's high porosity. Also how harsh they are depends on their concentration in the shampoo and the presence of other ingredients. </p>
    <p>Curlsbot decides based on what's generally considered safe in the curly girl community (Facebook, Reddit) and data from studies comparing different detergents to sulfates.</p>

    <p> If you want to know more I recommend starting a discussion at our <a href="https://www.facebook.com/groups/1804576666517325">Facebook Group</a> or joining one of the communities on our <Link to="/resources" >resources page for more guidance.</Link> </p>
    <h2>Non-Cg Cleasners (Harsh)</h2>
    <ul>
        <ResultListing list={cleansers.bad}/>
    </ul>
    <h2>Caution </h2>
    <em>Some find these drying, but they are NOT sulfates</em>
    <ul>
        <ResultListing list={cleansers.caution}/>
    </ul>
    <h2>Gentle CG Friendly Detergents</h2>
    <ul>
        <ResultListing list={cleansers.good}/>
    </ul>


  
  </div>
)

export default Sulfates