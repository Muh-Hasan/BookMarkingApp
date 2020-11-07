const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
q = faunadb.query

require("dotenv").config()

const client = new faunadb.Client({
  secret: process.env.DB_SECRET,
})
const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String!
    description: String
  }
`

const resolvers = {
  Query: {
    bookmarks: async () => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("bookmarks"))),
            q.Lambda(x => q.Get(x))
          )
        )
        const data = result.data.map(t => {
          return {
            id: t.ref.id,
            url: t.data.url,
            title: t.data.title,
            description: t.data.description,
          }
        })
        return data
      } catch (error) {
        console.log(error)
        return error.toString()
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
