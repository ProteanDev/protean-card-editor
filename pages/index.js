import React from 'react'
// import Link from 'next/link'
import { Container } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <title>Protean Card Editor</title>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Head>
    <Nav />
    <Container>
    </Container>

  </div>
)

export default Home
