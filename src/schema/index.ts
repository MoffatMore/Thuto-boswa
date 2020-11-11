import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import User from '../entity/User';
import userResolver from './resolvers/userResolvers';

const typeDefs = importSchema(`${__dirname}/typeDefs.graphql`);

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

export type contextType = {
  user: User;
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
