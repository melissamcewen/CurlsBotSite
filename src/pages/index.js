import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <p>A lot of people are interested in properly caring for their naturally curly or wavy hair, but it can be confusing to find the right methods and products. CurlsBot aims to make it all easier by analyzing ingredient lists to see if they comply with the "curly girl" rules pioneered by Lorraine Massey.</p>
    <p>CurlsBot is a simple open-source FB chatbot created to be helpful and for fun! I love tinkering with new technology and this was a fun chance to test something useful in the wild.</p>
    <p>It is open-source, so you can make your own by forking the code on <a href="https://github.com/melissamcewen/curlsbot">Github</a> or <a href="https://few-november.glitch.me/">Glitch</a>. </p>
    <p>It is in testing mode, please <a href="https://www.facebook.com/CurlsBot/">message the page to be added as a tester</a></p>
    <p>This was inspired by my own work on bots at my job as a developer as well as the <a href="http://isitcg.herokuapp.com/">isitcg app</a>. It differs a little in its functionality – it can't tell you about things like protein or humetants yet, but it has a more advanced function for identifying non-"curly girl" ingredients.</p>
    <Link to="/privacy-policy/">Privacy Policy</Link>
  </div>
)

export default IndexPage
