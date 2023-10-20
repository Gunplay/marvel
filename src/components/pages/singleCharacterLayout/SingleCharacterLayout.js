import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './singleCharacterLayout.scss'

import useMarvelService from '../../../services/MarvelService'
import ErrorMessage from '../../errorMessage/ErrorMessage'
import Spinner from '../../spinner/Spinner'

const SingleCharacterLayout = () => {
  const { charId } = useParams()

  const [char, setChar] = useState()

  const { loading, error, getCharactersById, clearError } = useMarvelService()

  useEffect(() => {
    const updateChar = async () => {
      const newChar = await getCharactersById(charId)
      setChar(newChar)
    }
    updateChar()
  }, [charId])

  const onCharLoaded = (id) => {
    setChar(id)
  }

  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(
    loading ||
    error ||
    !char ||
    Object.keys(char).length === 0
  ) ? (
    <View char={char} />
  ) : null

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({ char }) => {
  if (!char || Object.keys(char).length === 0) {
    return null
  }
  console.log('char', char)
  const { name, description, thumbnail } = char
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  )
}

export default SingleCharacterLayout
