import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { USER, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const user = useQuery(USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  const allBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (user.data && user.data.me) {
      console.log(user.data.me)
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])
  

  if (!show) {
    return null
  }

  const books = allBooks.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre </p>
      {
        !genre
        ?
        <div>loading book data...</div>
        :
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
      </table>}
    </div>
  )
}

export default Recommend
