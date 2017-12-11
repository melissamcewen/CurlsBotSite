import React from 'react'
import Link from 'gatsby-link'
import styles from './nav.module.css'



const Nav = () => (
  <ul className={styles.nav}>
    <li className={styles.item}>
      <Link to="/cg-lite/" className={styles.link}>Light Products</Link>
    </li>
    <li className={styles.item}>
      <Link to="/porosity/" className={styles.link}>Porosity Quiz</Link>
    </li>

  </ul>
)

export default Nav