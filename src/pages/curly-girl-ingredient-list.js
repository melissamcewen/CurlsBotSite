import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'

import alcohols from '../ingredient-data/alcohols';
import silicones from '../ingredient-data/silicones';
import waxes from '../ingredient-data/waxes';
import others from '../ingredient-data/others';
import cleansers from '../ingredient-data/cleansers';



import ResultListing from '../components/analyzer/resultlisting';


const list = () => (
  <div>
    <Helmet
      title="Curlsbot List of curly hair Ingredients"
      meta={[
        { name: 'description', content: 'Full list of curly hair and non-curly hair ingredients' },
        { name: 'keywords', content: 'products, curly hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>Curlsbot List of curly hair Ingredients</h1>

    <h2>Silicones</h2>
    <h3>Avoid</h3>
    <p>All ingredients that <b>contain</b> the following words. The reason these are discouraged on curl friendly routines is they can build up on the hair and it is not possible to remove them with just a cowash.</p>
    <ul>
        <ResultListing list={silicones.unknown.sort()}/>
    </ul>

    <em>So for example "dimethiconol" is forbidden because it contains "dimethicon"</em>
    <h3>Caution</h3>
    <p>Any silicones that start with these words are water soluble, so they should wash out with cowashing. Some believe they are OK but others say to avoid them. It's up to you:</p>
    <ul>
        <ResultListing list={silicones.good.sort()}/>
    </ul>

    <h2>Waxes/Hair Coating Ingredients</h2>
    <h3>Avoid</h3>
    <p>All ingredients that <b>contain</b> the following words. The reason these are forbidden on curl friendly routines is they can build up on the hair and it is not possible to remove them with just a cowash.</p>
    <ul>
        <ResultListing list={waxes.unknown.sort()}/>
    </ul>

    <em>So for example "almond wax" is marked "avoid" because it contains "wax". Cire is a French word for waxes and Cera is a Latin word for wax.</em>
    <h3>Approved Waxes</h3>
    <p>There are a few exceptions which are these water-soluble waxes:</p>
    <ul>
        <ResultListing list={waxes.good.sort()}/>
    </ul>

    <h2>Sulfates (and other cleansers)</h2>
    <p><Link to="cleansers" className="btn btn-secondary">See our Cleansers article for more info</Link></p>
    <h3>Avoid</h3>
    <p>The following are sulfates or similar cleansers and not recommended because they can dry out hair. How drying a product is depends on more than if it contains sulfates or not, but it's easiest just to avoid them.</p>
    <ul>
        <ResultListing list={cleansers.bad.sort()}/>
    </ul>

    <h3>Caution </h3>
    <em>Some find these drying, but they are NOT sulfates. We recommend you do your own research to find out if these are good for your hair.</em>
    <ul>
        <ResultListing list={cleansers.caution.sort()}/>
    </ul>
    <h3>Gentle Detergents</h3>
    <ul>
        <ResultListing list={cleansers.good.sort()}/>
    </ul>


    <h2>Other</h2>
    <p>Curlsbot also detects the following questionable ingredients</p>
    <h3>Soap</h3>
    <p>Soap can be as drying as sulfates. Check out our <Link to="/shampoo-bars-are-not-cg/" className="btn btn-secondary">article on soap</Link> for more info. We detect by looking for the following, but this may not catch all soap. We recommend contacting the manufacturer to ask if something contains soap :</p>

    <ul>
        <ResultListing list={others.soaps.sort()}/>
    </ul>

    <h3>Parabens</h3>
    <p> Lorraine Massey cautions against these in the curly hair <a href="https://amzn.to/2Y0pqDb">Handbook</a> saying "In recent years, they’ve become controversial as experts question whether they are safe. (Some say they may be linked to cancer.)" We recommend we do your own research. </p>

    <h3>Witch Hazel</h3>
    <p>Most types of witch hazel contain alcohol. Contact the manufacturer to see if the witch hazel in this product contains alcohol. Even if it does not contain alcohol, many people find witch hazel drying. Use with caution if you have hair prone to dryness. </p>





  </div>
)

export default list
