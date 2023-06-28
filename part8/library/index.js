const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const typeDefs = require('./models/schema')
const resolvers = require('./resolvers')
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected successfully')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currUser = await User.findById(decodedToken.id)
      return { currUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
