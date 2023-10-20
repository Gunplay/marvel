import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { MainPage, ComicsPage, SingleComicPage } from '../pages' // find index.js!!!!!!!!!!!!!  STATIC
import PropTypes from 'prop-types'
import AppHeader from '../appHeader/AppHeader'
import Spinner from '../spinner/Spinner'

// DINAMIC import - very important what would be in the end
const Page404 = lazy(() => import('../pages/404.js'))
const MainPage = lazy(() => import('../pages/MainPage.js'))
const ComicsPage = lazy(() => import('../pages/ComicsPage.js'))
const CharactersPage = lazy(() => import('../pages/CharactersPage.js'))
const SingleCharacterLayout = lazy(() =>
  import('../pages/singleCharacterLayout/SingleCharacterLayout.js')
)
const SingleComicLayout = lazy(() =>
  import('../pages/SinlgeComicLayout/SingleComicLayout.js')
)
// import MainPage from '../pages/MainPage'
// import ComicsPage from '../pages/ComicsPage'
// 751
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              {/* либо корневой компонент ставить на последнее место */}
              {/* Полное совпадение пути exact - 2*/}
              {/* Moved route / to the end in order main page was default and deleted
            exact !!!!!!!*/}
              <Route exact path="/">
                <MainPage />
              </Route>

              <Route exact path="/characters">
                <CharactersPage />
              </Route>

              <Route exact path="/characters/:charId">
                <SingleCharacterLayout />
              </Route>

              <Route exact path="/comics">
                <ComicsPage />
              </Route>
              {/* match it is path 1) params is key = :comicId, value - 232312 */}
              <Route exact path="/comics/:comicId">
                <SingleComicLayout />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

// App.propTypes = {
//   onCharSelected: PropTypes.func,
// }

export default App
