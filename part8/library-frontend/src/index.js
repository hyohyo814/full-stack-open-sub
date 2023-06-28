import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ALL_BOOKS } from './queries'
import App from './App'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('loggedInUser')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

await client.refetchQueries({
  onQueryUpdated(ALL_BOOKS) {
    return true
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
)
