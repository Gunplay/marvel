import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import './comicsList.scss'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoading, setnewItemLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [comicsEnded, setComicsEnded] = useState(false)

  const { error, loading, getAllComics } = useMarvelService()

  useEffect(() => {
    // console.log('useEffect Comics')
    onRequest(offset, true)
  }, [])

  const onRequest = async (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true)
   
      const res = await getAllComics(offset)
      onComicsListLoaded(res) // newComicsList
   
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false
    if (newComicsList.length < 8) {
      ended = true
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList])

    setnewItemLoading(false)
    setOffset(offset + 8)
    setComicsEnded(ended)
  }

  function renderComics(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })

    return <ul className="comics__grid">{items}</ul>
  }
  const items = renderComics(comicsList)

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading && !newItemLoading ? <Spinner /> : null
  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList
