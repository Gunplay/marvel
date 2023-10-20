import AppBanner from '../appBanner/AppBanner'
import CharList from '../charList/CharList'
import { Helmet } from 'react-helmet'

import React from 'react'

const CharactersPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page  with list our Characters" />
        <title>Characters page</title>
      </Helmet>
      <AppBanner />
      <CharList />
    </>
  )
}

export default CharactersPage
