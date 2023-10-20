import AppBanner from '../appBanner/AppBanner'
import ComicsList from '../comicsList/ComicsList'
import { Helmet } from 'react-helmet'

import React from 'react'

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page  with list our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  )
}

export default ComicsPage
