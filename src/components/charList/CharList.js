import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService'
import './charList.scss'

const CharList = (props) => {
  const [charList, setCharList] = useState([])

  const [newItemLoading, setNewItemLoading] = useState(false)

  const [offset, setOffset] = useState(210)
  const [charEnded, setCharEnded] = useState(false)
  // id: uuidv4(),

  // const marvelService = new MarvelService()

  const { loading, error, getAllCharacters } = useMarvelService()
  // useEffect запускается после рендера, то есть когда функция существует внутри нашегго компонента
  useEffect(() => {
    onRequest(offset, true)
  }, []) // Когда массив пустой - функ вып один раз

  const onRequest = async (offset, initial) => {
    // console.log(offset)
    initial ? setNewItemLoading(false) : setNewItemLoading(true)
    // setNewItemLoading(true) // N2
    try {
      const response = await getAllCharacters(offset) //N3 newState
      console.log(response)
      onCharListLoaded(response)
    } catch (err) {
      // onError(err)
    }
    // .then(this.onCharListLoaded)
    // .catch(this.onError)
  }

  const onCharListLoaded = (response) => {
    // const { logger, SecondLog } = await import('./someFunc.js')
    // logger()
    // SecondLog()
    // console.log('res', response.data)
    let ended = false
    if (response.data?.length < 10) {
      ended = true
    }
    //N 4
    // ASYNC TASK
    // loadingScroll: true,
    //                         [ null ]   newItem
    // console.log('charList fisrt', charList)

    setCharList((charList) => {
      // console.log('charList second', charList)

      return [...charList, ...response.data]
    })
    setNewItemLoading((newItemLoading) => false)
    setOffset((offset) => response.offset)
    setCharEnded((charEnded) => ended)
  }

  const itemRefs = useRef([]) // только на верхнем уровне

  //  setRef = (ref) => {
  //   this.itemRefs.push(ref)
  // }

  const focusOnItem = (id) => {
    // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    // На самом деле, решение с css-классом можно сделать, вынеся персонажа
    // в отдельный компонент. Но кода будет больше, появится новое состояние
    // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

    // По возможности, не злоупотребляйте рефами, только в крайних случаях
    itemRefs.current.forEach((item) => {
      item.classList.remove('char__item_selected')
    })
    itemRefs.current[id].classList.add('char__item_selected')
    itemRefs.current[id].focus()
  }

  const handleLoadMore = () => {
    // this.setState({ ...this.state, offset: this.state.offset + 10 })
    onRequest(offset + 10)
  }
  // Этот метод создан для оптимизации,
  // чтобы не помещать такую конструкцию в метод render
  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' }
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' }
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          // ref={(ref) => (this.listRef = ref)}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id)
            focusOnItem(i)
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id)
              focusOnItem(i)
            }
          }}
        >
          <Link to={`/characters/${item.id}`}>
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </Link>
        </li>
      )
    })
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>
  }

  const items = renderItems(charList)

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading && !newItemLoading ? <Spinner /> : null // убираем работу спиннера при каждом запросе
  // const content = !(loading || error) ? items : null - убираем что не загружать каждый раз контент сначала

  // if (loading) {
  //   import('./someFunc.js') // Dinamic import - it is promose
  //     // .then((obj) => obj.logger()) // named import
  //     .then((obj) => obj.default()) // default
  //     .catch()
  // }

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {/* {content} */}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={handleLoadMore}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

// CharList.propTypes = {
//   onCharSelected: PropTypes.func.isRequired,
// }

export default CharList
