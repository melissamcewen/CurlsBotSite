import React from 'react'
import Link from 'gatsby-link'

const SecondPage = () => (
  <div>
    <h1>Privacy Policy</h1>
    <p>When you message CurlsBot, the Facebook messenger API collects very basic data by default: your user ID, your public profile, and the timestamp of your message. </p>
    <p>I read your messages in order to improve CurlsBot and catch mistakes. </p>
    <p>The application is hosted on Glitch, which may have access to the data, the system keeps logs but they are not available to the public. I take your privacy seriously and have taken proper precautions to keep the data private. Since the application utilizes the Facebook API's it cannot support Do Not Track requests.</p>
    <p><a href="mailto:mgmcewen@gmail.com">Contact me, Melissa McEwen, if you have any questions.</a></p>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default SecondPage
