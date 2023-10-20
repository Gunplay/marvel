import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
  const _apiKey = 'apikey=889c8db3d6e0ff33fda7c461355be34e'
  const _baseOffset = 210

  // getResource = async (url) => {
  //   let res = await fetch(url)

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  //   }

  //   return await res.json()
  // }

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=10&offset=${offset}&${_apiKey}`
    )
    console.log('res', res)
    return {
      data: res.data.results.map(_transformCharacter),
      offset: res.data.offset,
    } //char
    //res.data.results.map(this._transformCharacter)
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
    return res.data.results.map(_transformCharacter)
  }

  const getCharactersById = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0])
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    )
    return res.data.results.map(_transformComics)
    // return {
    //   data: res.data.results.map(_transformComics),
    //   offset: res.data.offset,
    // }
  }

  const _transformCharacter = (char) => {
    console.log('_transformCharacter', char)
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.slice(0, 9),
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects[0]?.language || 'en-us',
      // optional chaining operator
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : 'not available',
    }
  }

  return {
    loading,
    error,
    clearError,
    getCharactersById,
    getAllCharacters,
    getComic,
    getAllComics,
    getCharacterByName,
  }
}

export default useMarvelService
