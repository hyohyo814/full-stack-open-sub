import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import _ from 'lodash'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const allRes = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  if (!show) {
    return null
  }
  if (result.loading || allRes.loading) {
    return <div>loading books...</div>
  }

  const books = result.data.allBooks
  const fixedBooks = allRes.data.allBooks
  const allGenres = _.map(fixedBooks, (b) => b.genres)
  const filterSel = _.uniq(_.flatten(_.values(allGenres)))
  const filterList = _.map(filterSel, (f) => {
    return (
      <button
        key={f}
        value={f}
        onClick={({ target }) => setGenre(target.value)}>
        {f}
      </button>
    )
  })

  return (
    <div>
      <h2>books</h2>
      {!genre ? <p><b>all books</b></p> : <p>in genre <b>{genre}</b></p>}
      <table style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterList}
      <button onClick={({ target }) => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
