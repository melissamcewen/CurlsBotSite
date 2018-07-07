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
    <h2>1. Sees if it's a valid ingredient list</h2>
    <p>First Curlsbot sees if it's a valid ingredient list - if it's a URL it won't analzye it. If it's a list where each ingredient isn't seperated by a comma, it can't analyze it. I may add more support for non comma seperated lists in the future.</p>
    <h2>2. Looks for silicones</h2>
    <p>Curlsbot sees if any ingredients contain the letters "cone", "demethicon", "silane" or "siloxane." If any ingredient has these, it's probably a silicone. Curlsbot will tell you it's not CG UNLESS it also has a peg/ppg/pg- prefix. These are PEG silicones and they are CG since they are modified to be water soluble.</p>
    <h2>3. Looks for waxes</h2>
    <p>Then it looks for ingredients with the words "wax", "cera", "cire", and "paraffin." It marks these non-CG unless they are emulsified or have a peg prefix to make them water soluble.</p>
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
      <li>"sodium lauryl sulfoacetate",</li>
      <li>"sodium myreth sulfate",</li>
      <li>"sodium xylenesulfonate",</li>
      <li>"tea-dodecylbenzenesulfonate",</li>
      <li>"ethyl peg-15 cocamine sulfate",</li>
      <li>"dioctyl sodium sulfosuccinate",</li>
      <li>"sodium coco-sulfate",</li>
      <li>"sodium coco sulfate"</li>
    </ul>
    <p>Right now it does not mark things like "sodium c14-16 olefin sulfonate" as non cg because it is not as harsh as the above listed sulfates.</p>
    <h2>5. Other ingredients</h2>
    <p>It also looks for common misspellings of sulfates, silicones and waxes like "dimethcione".</p>
    <h2>6. What it does NOT look for</h2>
    <p> Some "curly girl" sites list other ingredients as forbidden like castor oil. However these are not mentioned in the original handbook and are no more "water insoluble" than other oils like coconut oil.</p>



    
  </div>
)

export default Works
