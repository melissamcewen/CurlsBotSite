import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'

import alcohols from '../ingredient-data/alcohols';
import silicones from '../ingredient-data/silicones';
import waxes from '../ingredient-data/waxes';

import ResultListing from '../components/analyzer/resultlisting';


const Works = () => (
  <div>
    <Helmet
      title="How Curlsbot Works"
      meta={[
        { name: 'description', content: 'How Curlsbot works' },
        { name: 'keywords', content: 'products, curly hair' },
        {
          property: 'og:image',
          content: 'http://www.curlsbot.com/img/icon.png'
        }
      ]}
    />
    <h1>How Curlsbot Works/FAQ</h1>

    <h2>1. How do I send Curlsbot lists of ingredients?</h2>
    <p>Curlsbot used to be a Chatbot on FB but now it is here on this site. Put your ingredients in the box <Link to="/" >here</Link> and get instant results.</p>

    <h2>2. What list do you use?</h2>
    <p><Link to="/curly-girl-ingredient-list/" >Click here to see our complete list.</Link></p>

    <h2>3. Why does Curlsbot give me the wrong results?</h2>
    <p>Curlsbot is not perfect, Curlsbot will give the wrong results if ingredients are misspelled. I recommend you find a list from the manufacturer's or a store website rather than typing the list out yourself. Occasionally these lists also have misspellings. <a href="http://m.me/curlsbot">Message me if you see something wrong so I can fix it.</a> </p>

     <h2>4. Why can't Curlsbot read my list?</h2>
      <p>Curlsbot can only read comma seperated lists like "ingredient 1, ingredient 2, ingredient 3." It cannot read lists like "ingredient 1/ingredient 2/ ingredient 3" or those seperated by line breaks. There are some tools online that can fix the list for you or you can do it yourself. </p>

      <h2>5. Can you tell me if this picture is curly hair approved?</h2>
      <p>Curlsbot cannot read pictures. If you send them to me I also cannot read them because it's not accurate to just have one person look at a bottle and often the picture is blurry. I recommend you find a list from the manufacturer's or a store website OR post the picture on one of the curly hair groups listed in our <Link to="/resources/" >resources page.</Link></p>

      <h2>6. What does it mean if it says "Caution"?</h2>
      <p>We recommend you do your own research since many experts disagree on some ingredients. You can find helpful advice on many CG groups listed on our <Link to="/resources/" >resources page.</Link></p>

      <h2>7.Can Curlsbot read other languages besides English?</h2>

      <p>Curlsbot currently only supports English language lists. We recommend finding a group for your language online and posting your product there. I have listed some groups on the <Link to="/resources/" >resources page.</Link></p> 


    
  </div>
)

export default Works
