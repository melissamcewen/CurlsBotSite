import React from 'react'
import Link from 'gatsby-link'
import styles from "./logo.module.css"
import logo from '../images/logo-small.png'



const Logo = () => (
  <div className={styles.logo}>
    <Link to="/" className={styles.link}>
      <img src={logo} alt="Logo" className={styles.image} />
    </Link>
  </div>
)

export default Logo