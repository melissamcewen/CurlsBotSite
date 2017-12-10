import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import logo from '../images/logo-small.png'
import ReactGA from 'react-ga'

import './index.css'

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
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <img src={logo} alt="Logo" />
        </Link>
      </h1>
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
            { name: 'keywords', content: 'chatbots, curly girl' },
          ]}
        />
        <Header />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {this.props.children()}
        </div>
      </div>
    );
  }
}


