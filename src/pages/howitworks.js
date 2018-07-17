import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'



const Works = () => (
  <div>
    <Helmet
      title="How Curlsbot Works"
      meta={[
        { name: 'description', content: 'Info about how Curlsbot analyzes products' },
        { name: 'keywords', content: 'products, curly girl' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>How Curlsbot Works</h1>
    <p>When you paste in an ingredient list, the code behind Curlsbot starts analyzing it. I'll take you step by step to see how it works.</p>
    <p>The rules are based on the latest edition handbook with some updates based on current research. For example Lorraine Massey never mentions Sodium Coco Sulfate, but we know it's essentially identical to the sulfates she does mention, so we label it as not CG. </p>
    <p>Remember, Curlsbot is NOT perfect, but it learns from you.  <a href="http://m.me/curlsbot">Send us a message</a> if you see anything wrong or questionable. Thanks to your messages, Curlsbot is 200% smarter and getting smarter every day.</p>
    <h2>1. Sees if it's a valid ingredient list</h2>
    <p>First Curlsbot sees if it's a valid ingredient list - if it's a URL it won't analzye it. If it's a list where each ingredient isn't seperated by a comma, it can't analyze it. I may add more support for non comma seperated lists in the future.</p>
    <h2>2. Looks for silicones</h2>
    <p>Curlsbot sees if any ingredients contain the letters "cone", "demethicon", "silane" or "siloxane." If any ingredient has these, it's probably a silicone. Curlsbot will tell you it's not CG UNLESS it also has a peg/ppg/pg- prefix. These are PEG silicones and they are CG since they are modified to be water soluble.</p>
    <h2>3. Looks for waxes</h2>
    <p>Then it looks for ingredients with the words "wax", "cera", "cire", "lanolin," and "paraffin." It marks these non-CG unless they are emulsified or have a peg prefix to make them water soluble.</p>
    <h2>4. Looks for sulfates</h2>
    <p>It looks for the sulfates mentioned in the curly girl handbook as well as alternative names for these sulfates. These include:</p>
    <ul>
      <li>"alkylbenzene sulfonate",</li>
      <li>"alkyl benzene sulfonate",</li>
      <li>"ammonium laureth sulfate",</li>
      <li>"ammonium lauryl sulfate",</li>
      <li>"ammonium xylenesulfonate",</li>
      <li>"sodium cocoyl sarcosinate",</li>
      <li>"sodium laureth sulfate",</li>
      <li>"sodium lauryl sulfate",</li>
      <li>"sodium myreth sulfate",</li>
      <li>"sodium xylenesulfonate",</li>
      <li>"tea-dodecylbenzenesulfonate",</li>
      <li>"ethyl peg-15 cocamine sulfate",</li>
      <li>"dioctyl sodium sulfosuccinate",</li>
      <li>"sodium coco-sulfate",</li>
      <li>"sodium coco sulfate"</li>
    </ul>
    <p>Right now it does not mark things like "sodium c14-16 olefin sulfonate" as non cg because it is not as harsh as the above listed sulfates.</p>
     <h2>5. Looks for drying alcohols</h2>
     <p>Next Curlsbot looks for words that contain "alcohol", "witch," or "propanol." It then sees if they match our list of alcohols and if not marks them "unknown." Please message us if you see an unknown alcohol so we can add to our database:</p>
     <ul>
        <li>"denatured alcohol",</li>
        <li>"sd alcohol 40",</li>
        <li>"witch hazel",</li>
        <li>"isopropanol",</li>
        <li>"ethanol",</li>
        <li>"sd alcohol",</li>
        <li>"propanol",</li>
        <li>"propyl alcohol",</li>
        <li>"isopropyl alcohol",</li>
        <li>"alcohol denat.",</li>
        <li>"sd alcohol 40-b",</li>
        <li>"alcohol denat",</li>
        <li>"sd alcohol 40b",</li>
        <li>"alcohol",</li>
        <li>"hamamellis virginiana (witch hazel) extract",</li>
        <li>"ethyl alcohol",</li>
        <li>"denatured alcohol (sd alcohol 40)",</li>
        <li>"sd alcohol 40-b (alcohol denat)",</li>
        <li>"phenylpropanol"</li>


     </ul>

    <h2>6. Other ingredients</h2>
    <p>It also looks for common misspellings of sulfates, silicones and waxes like "dimethcione".</p>
    <h2>7. What Curlsbot CAN'T do</h2>
    <h3>Silicon Quaternium</h3>
    <p>We mark these as NOT cg. Some people consider them OK if you use a low poo but Curlsbot is focused on ingredients that are true to the CG principles - which means they can be cowashed out.</p>
    <h3>Polyquats</h3>
    <p>Some people find <a href="http://science-yhairblog.blogspot.com/2013/11/polyquat-or-not.html">polyquats build up even though they are CG.</a> Curlsbot may provide info about this in the future.</p>
    <h3>Oils</h3>
    <p> Some "curly girl" sites list other ingredients as forbidden like castor and mineral oil. However these are not mentioned in the original handbook and are no more "water insoluble" than other oils like coconut oil.</p>
    <h3>Misspellings</h3>
    <p>Curlsbot knows a few common misspellings, but sometimes things can slip through. Always <em>double check</em> the results! If in doubt <a href="http://m.me/curlsbot">send us a message</a> </p>



    
  </div>
)

export default Works
