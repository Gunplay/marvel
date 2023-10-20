import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import WrapperModel from '../wrapperModel/WrapperModel'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import CharSearchForm from '../charSearchForm/CharSearchForm'

const MainPage = () => {
  const [selectedChar, setChar] = useState(null)

  useEffect(() => {
    // console.log('useEffect mainPage')
  }, [])

  const onCharSelected = (id) => {
    setChar(id)
  }

  const onClose = (e) => {
    // Добавьте здесь логику, которая будет выполняться при нажатии на клавишу Esc

    setChar(null)
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <ErrorBoundary>
        <CharSearchForm />
      </ErrorBoundary>
      <ErrorBoundary>
        <CharList onCharSelected={onCharSelected} />
      </ErrorBoundary>
      {/* {selectedChar && (
        <WrapperModel
          charInfo={selectedChar}
          onBtnClose={onClose}
          // onClose={() => this.setState({ selectedChar: null })}
        >
          <CharInfo charId={selectedChar} />
        </WrapperModel>
      )} */}
    </>
  )
}

export default MainPage
