import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import MarvelService from './services/MarvelService'
import './style/style.scss'

// const marvelService = new MarvelService()
// marvelService.getAllCharacters().then((res) =>
//   res.data.results.forEach((item, i) => {
//     if (item.name || item.id) console.log(`${i + 1}, ${item.id}, ${item.name}`)
//   })
// )

// const char_2 = new MarvelService()
// char_2.getCharactersById(1011052).then((res) => console.log(res))

//Ract 18.2  + flushSync(() => {}) - вернуть прежднее состояние, что бы state не опитимизироавались
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
