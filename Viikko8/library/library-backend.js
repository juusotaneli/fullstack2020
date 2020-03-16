const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI =
  'mongodb+srv://juuso:esaesa@library-cuozf.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find().populate('author')
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find()
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let name = args.author
      let author = await Author.findOne({ name })
      if (!author) {
        author = new Author({
          name,
          born: null
        })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      let book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return await book.save()
    },
    editAuthor: async (root, args) => {
      const name = args.name
      const born = args.setBornTo
      let author = await Author.findOneAndUpdate(
        { name },
        { born },
        {
          new: true
        }
      )
      if (!author) {
        return null
      }
      return author
    }
  },
  Author: {
    name: root => root.name,
    bookCount: async root => {
      const a = await Book.find({})
      const c = a.filter(b => String(b.author) === String(root._id))
      return c.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
