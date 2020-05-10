import React from 'react'
import Link from 'next/link'
import styles from './Nav.styles'
const {
  StyledNav,
} = styles

const Nav = () => (
  <StyledNav>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link href='https://github.com/ProteanDev'>
      <a>GitHub</a>
    </Link>
    <Link href='https://gitlab.com/proteandev'>
      <a>GitLab</a>
    </Link>
  </StyledNav>
)

export default Nav
