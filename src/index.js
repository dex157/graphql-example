const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {graphiqlKoa, graphqlKoa} = require('apollo-server-koa');
const {makeExecutableSchema} = require('graphql-tools');
const {find} = require('lodash');

const router = new Router();
const app = new Koa();

const posts = [
  {
    id: 1,
    title: 'Как завести машину зимой',
    authorId: 1,
    votes: 1,
  },
  {
    id: 2,
    title: 'Спортивные спойлеры',
    authorId: 2,
    votes: 3,
  },
  {
    id: 3,
    title: 'Крутой звук своими руками',
    authorId: 3,
    votes: 10,
  },
  {
    id: 4,
    title: 'Лучшая машина на свете',
    authorId: 3,
    votes: 10,
  },
  {
    id: 5,
    title: 'Не верьте мастерам!',
    authorId: 3,
    votes: 10,
  },
];

const authors = [
  {id: 1, firstName: 'Tom', lastName: 'Coleman'},
  {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
  {id: 3, firstName: 'Mikhail', lastName: 'Novikov'},
];

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
    canEdit: Boolean
  }

  type Query {
    posts: [Post]
    me: Author
    author(id: Int!): Author
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, {id}) => find(authors, {id}),
    me: () => find(authors, {id: 3})
  },

  Author: {
    posts: author => posts.filter(post => post.authorId === author.id),
  },

  Post: {
    author: post => find(authors, {id: post.authorId}),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

router.post('/graphql', bodyParser(), graphqlKoa({schema}));
router.get('/graphql', graphqlKoa({schema}));

router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
