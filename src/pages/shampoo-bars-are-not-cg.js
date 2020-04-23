import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'

import others from '../ingredient-data/others'



import ResultListing from '../components/analyzer/resultlisting'



const bars = () => (
  <div>
    <Helmet
      title="Are Shampoo Bars and Soaps curly hair?"
      meta={[
        { name: 'description', content: 'Soap, shampoo bars, and the curly hair method' },
        { name: 'keywords', content: 'products, curly hair, shampoo bars, ph balance, sulfates' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>Soap, Shampoo Bars + curly hair</h1>
    <h2>Summary</h2>
    <ul>
      <li>Soap is made from saponification of oils/fats</li>
      <li>Soap is a low pH and can damage your hair. </li>
      <li>Cleansing-wise, most tests show it is harsher than sulfates. Which makes it not CG-friendly. </li>
      <li>CG-friendly cleansers are usually <em>detergents</em>, which are <a href="https://www.quirkyscience.com/difference-soap-detergent/">different</a> from <em>soap</em></li>
      <li>Many but not all shampoo bars contain soap. Some other popular soap products include Dr. Bronners.</li>
    </ul>


    <h2>Why You Should Avoid Soap On Your Hair</h2>
    <p>Soap is much worse for your hair than sulfates. It can be much more harsh than sulfates in <a href="http://www.essentialingredients.com/pdf/clariantmildsurfactants.pdf">all scientific tests of harshness that I have seen</a>. It is also alkaline. The pH of hair is 5.5 and most good quality cleansers are around that as well. But soap is usually 8 or more. This can <a href="https://www.facebook.com/swiftcraftymonkey/photos/a.1872648986308817.1073741829.1841354482771601/2108742819366098/?type=3">damage hair badly, leaving it dull and dry</a>. For skin soap can be fine, as skin can recover from the damage. But hair is not "alive" and cannot.</p>
    <p><a href="http://science-yhairblog.blogspot.com/2016/03/hard-water-and-your-hair.html">If you have hard water, soap can leave residue on your hair that's difficult to remove. </a> Most soaps also contain heavy waxes and oils that leave even more buildup.</p>
    <p>Some people recommend using baking soda to remove this residue which does <a href="https://abetterwaytothrive.com/what-years-of-baking-soda-no-poo-did-to-my-long-healthy-hair-or-when-a-natural-living-experiment-fails/">further damage to your hair.</a></p>
    <p>Initially this type of routine may make your hair look nice. But over time buildup and damage take their toll.</p>
    <p> CG friendly  <Link to="/cleansers">cleansers</Link> are <a href="https://www.quirkyscience.com/difference-soap-detergent/">detergents, which are different from soap.</a></p>
    <h2>Are Shampoo Bars Soap?</h2>
    <p>Shampoo bars are growing in popularity. Many are touted as being environmentally friendly, natural, and budget friendly. But not all shampoo bars are made alike. </p>
    <p>
      There are two main types of shampoo bars: those made with <em>soap<em/> and those that contain <em>detergents</em>. Remember these are different!</em>
    </p>
    <p>I messaged Lorraine Massey about shampoo bars: she said that she believes they are just as damaging as traditional shampoo. There are a few out there made with gentler detergents (sodium cocoyl isethionate for example) that may be CG-friendly. I recommend always asking the manufacturer to confirm they are ph balanced and <strong>not made with soap</strong> since labeling can be deceptive.</p>
    <p>Here is a post with <a href="https://swiftcraftymonkey.blog/questions-and-answers-about-shampoo-bars-the-master-list/"> details about soap and pH testing.</a></p>
    <h2>How do I know if it's soap?(and why Curlsbot fails)</h2>
    <p>Curlsbot can detect some shampoo bars but not all based on the ingredients lists. Curlsbot only works if contains certain words in the in the ingredients list:</p>

    <ul>
        <ResultListing list={others.soaps.sort()}/>
    </ul>

    <p>but not all soap ingredients lists have these ingredients. For example this list would show up OK on Curlsbot</p> 
    <blockquote className="blockquote">
    ingredients: extra virgin olive oil, *avocado oil, castor oil, *coconut oil, pumpkinseed oil, *fair trade shea butter, purified water, sodium hydroxide, *sweet orange (citrus sinesis) essential oil, lime (citrus aurantifolia) essential oil, infused herbs: *marshmallow root, *catnip, *chamomile, * lavender
    </blockquote>
    <p>Even though it's soap! Why? The oils here have been saponified, turning them into soap.</p>
    <p>Also occasionally Curlsbot might mark an OK ingredient as soap if it's a byproduct of the saponification process. Glycerin for example, it is a <u>byproduct</u> of some soapmaking, but is not soap. Please <a href="http://m.me/curlsbot">message me </a> if you see this. </p>

    <p>I hope to eventually train Curlsbot better to detect these patterns. Sodium hydroxide + oils is a clue but that pattern is also in many OK non-bar products, also some just list the oils especially if they are on Etsy. </p>
    <p><strong>I recommend you contact the manufacturer and ask if the product contains soap.</strong></p>
    



    
  </div>
)

export default bars
