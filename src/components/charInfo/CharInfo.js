import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'
// import thor from '../../resources/img/thor.jpeg'

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null) // {} === true
  console.log('char', char)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { loading, error, getCharactersById } = useMarvelService()

  useEffect(() => {
    const updateChar = async () => {
      if (!charId) {
        return
      }
      // setError(false)
      const char = await getCharactersById(charId)
      console.log('char', char)
      setChar(char)
    }
    updateChar()
    setIsModalOpen(true)
  }, [charId])

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.charId !== prevProps.charId) {
  //     this.updateChar()
  //   }
  // }

  // componentDidCatch(err, info) {
  //   console.log(err, info)
  //   this.setState({ error: true })
  // }

  // onCharLoaded = (char) => {
  //   this.setState({ char: char, loading: false }) // write new object or char
  // }

  // const { onMouseEnter, onMouseLeave } = this.props
  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View char={char} /> : null
  const charInfoOvelay = 'char__info-overlay'
  return (
    <div>
      <div class={charInfoOvelay}>
        <div>
          {isModalOpen && (
            <div className="char__info">
              {skeleton}
              {errorMessage}
              {spinner}
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char
  let imgStyle = { objectFit: 'cover' }
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' }
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
        {/* In Norse mythology, Loki is a god or jötunn (or both). Loki is the son */}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There are no comics for this character'}
        {comics.map((item, i) => {
          // if (i < 9) return // it is not optimal method
          return (
            <>
              <li key={i} className="char__comics-item">
                <a href={item.resourceURI}>{item.name}</a>
              </li>
            </>
          )
        })}

        {/* <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li> */}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo
