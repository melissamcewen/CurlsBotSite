import React from 'react'
import Link from 'gatsby-link'
import styles from "./logo.module.css"
import logo from '../images/logo-small.png'



const Logo = () => (
    <Link to="/" className={styles.link}>
      <img src={logo} alt="Logo" className="img-fluid" />
    </Link>
)

export default Logo