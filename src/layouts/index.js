import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Nav from '../components/nav'
import ReactGA from 'react-ga'
import { withPrefix } from 'gatsby-link'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';



const Header = () => (
  <div
    style={{
      background: '#e7d467',
      marginBottom: '1rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem 1.0875rem',
      }}
    >

      <Nav/>
    </div>
  </div>
)


const Footer = () => (
  <div
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem 1.0875rem',
      }}
    >

      <small>This web site is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by The Curly Girl Method by Lorraine Massey™️. Some links on Curlsbot are Amazon Affiliate or Verelle Affiliate links. Shopping through these links supports the further development of Curlsbot.</small>
    </div>
  </div>
)


const logPageView = (ReactGA) => {
  console.log("Logged view on: ", window.location.pathname)
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}


export default class TemplateWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

  componentDidMount() {
    ReactGA.initialize('UA-110983103-1', {
   //debug: true,

});
    logPageView(ReactGA)
  }

  componentWillReceiveProps() {
    logPageView(ReactGA);
  }

  render() {
    return (
      <div>
        <Helmet
          title="CurlsBot"
          meta={[
            { name: 'description', content: 'A hair care chatbot!' },
            { name: 'keywords', content: 'chatbots, curly hair' },
            {
              property: 'og:image',
              content: 'http://www.curlsbot.com/img/icon.png'
            }
          ]}
        >
          <meta name="google-site-verification" content="vFMnYOqnsQwevkYo--zeevG2gat6gN-QAqbauxy1N7A" />

      </Helmet>
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
            clear: 'both'
          }}
        >

          {this.props.children()}
        </div>
        <Footer />
      </div>
    );
  }
}


