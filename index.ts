import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Express } from 'express';
import { GraphQLError } from 'graphql';
import { gql } from 'graphql-tag';
import http from 'http';

const typeDefs = gql`
  type Query {
    movies: [Movie]
  }

  type Movie {
    title: String!
    director: String!
  }
`;

const movies = [
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
  },
  {
    title: 'Star Wars',
    director: 'George Lucas',
  },
];

const resolvers = {
  Query: {
    movies: () => {
      console.log('resolve movies');
      return movies;
    },
  },
};

async function createApp(): Promise<Express> {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: true,
    plugins: [
      {
        async serverWillStart({ logger, cache, schema, apollo, startedInBackground }) {
          console.log('serverWillStart');
          // throw Error(); // => startupDidFail

          return {
            // 
            schemaDidLoadOrUpdate({ apiSchema, coreSupergraphSdl }) {
              console.log('schemaDidLoadOrUpdate');
              // throw Error();  // => startupDidFail
            },


            async drainServer() {
              console.log('drainServer');
            },

            async serverWillStop() {
              console.log('serverWillStop');
            },

            // async renderLandingPage() {
            //   console.log('renderLandingPage');
            //   // throw Error();  // => startupDidFail
            //   return {
            //     html: 'Hello World',
            //   };
            // }
          };
        },

        // Fires whenever a GraphQL request is received from a client.
        async requestDidStart({
          logger,
          cache,
          request,
          response,
          schema,
          contextValue,
          queryHash,
          document,
          source,
          operationName,
          operation,
        }) {
          console.log('requestDidStart');
          // throw Error();  // => unexpectedErrorProcessingRequest
          // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest
      
          return {
            async didResolveSource({ source, queryHash, document, operationName, operation }) {
              console.log('didResolveSource');
              console.log('didResolveSource source:', source);
              console.log('didResolveSource queryHash:', queryHash);
              console.log('didResolveSource document:', JSON.stringify(document));
              console.log('didResolveSource operationName:', JSON.stringify(operationName));
              console.log('didResolveSource operation:', JSON.stringify(operation));
              // throw Error();  // => unexpectedErrorProcessingRequest
              // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest
            },

            async parsingDidStart({ source, queryHash, document, operationName, operation }) {
              console.log('parsingDidStart');
              console.log('parsingDidStart source:', source);
              console.log('parsingDidStart queryHash:', queryHash);
              console.log('parsingDidStart document:', JSON.stringify(document));
              console.log('parsingDidStart operationName:', JSON.stringify(operationName));
              console.log('parsingDidStart operation:', JSON.stringify(operation));
              // throw Error();  // => unexpectedErrorProcessingRequest
              // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest

              return async (err) => {
                console.log('parsingDidStart result', err);
              };
            },
      
            async validationDidStart({ source, queryHash, document, operationName, operation }) {
              console.log('validationDidStart');
              console.log('validationDidStart source:', source);
              console.log('validationDidStart queryHash:', queryHash);
              console.log('validationDidStart document:', JSON.stringify(document));
              console.log('validationDidStart operationName:', JSON.stringify(operationName));
              console.log('validationDidStart operation:', JSON.stringify(operation));
              // throw Error();  // => unexpectedErrorProcessingRequest
              // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest

              return async (err) => {
                console.log('validationDidStart result', err);
              }
            },

            async didResolveOperation({ source, queryHash, document, operationName, operation }) {
              console.log('didResolveOperation');
              console.log('didResolveOperation source:', source);
              console.log('didResolveOperation queryHash:', queryHash);
              console.log('didResolveOperation document:', JSON.stringify(document));
              console.log('didResolveOperation operationName:', JSON.stringify(operationName));
              console.log('didResolveOperation operation:', JSON.stringify(operation));
              // throw Error();  // => didEncounterErrors
              // throw new GraphQLError('test');  // => didEncounterErrors
            },

            async responseForOperation({ source, queryHash, document, operationName, operation }) {
              console.log('responseForOperation');
              console.log('responseForOperation source:', source);
              console.log('responseForOperation queryHash:', queryHash);
              console.log('responseForOperation document:', JSON.stringify(document));
              console.log('responseForOperation operationName:', JSON.stringify(operationName));
              console.log('responseForOperation operation:', JSON.stringify(operation));
              // throw Error();  // => unexpectedErrorProcessingRequest
              // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest

              return null;
            },

            async executionDidStart({ source, queryHash, document, operationName, operation }) {
              console.log('executionDidStart');
              console.log('executionDidStart source:', source);
              console.log('executionDidStart queryHash:', queryHash);
              console.log('executionDidStart document:', JSON.stringify(document));
              console.log('executionDidStart operationName:', JSON.stringify(operationName));
              console.log('executionDidStart operation:', JSON.stringify(operation));
              // throw Error();  // => unexpectedErrorProcessingRequest
              // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest

              return {
                willResolveField({ source, args, contextValue, info }) {
                  console.log('willResolveField');
                  console.log('willResolveField source:', source);
                  // console.log('willResolveField args:', args);
                  // console.log('willResolveField contextValue:', contextValue);
                  // console.log('willResolveField info:', info);
                  // throw Error();  // => didEncounterErrors
                  // throw new GraphQLError('test');  // => didEncounterErrors

                  return (err, result) => {
                    console.log('willResolveField after');
                    console.log('willResolveField after result:', result);
                    console.log('willResolveField after err:', err);
                  }
                },
                executionDidEnd: async (err) => {
                  console.log('executionDidEnd result', err);
                  // throw Error();  // => unexpectedErrorProcessingRequest
                  // throw new GraphQLError('test');  // => unexpectedErrorProcessingRequest
                },
              };
            },

            async willSendResponse(requestContext) {
              console.log('willSendResponse');
            },

            async didEncounterErrors() {
              console.log('didEncounterErrors');
            },

            async didEncounterSubsequentErrors(requestContext, errors) {
              console.log('didEncounterSubsequentErrors');
            },

            async willSendSubsequentPayload(requestContext, payload) {
              console.log('willSendSubsequentPayload');
            },
          };
        },

        async unexpectedErrorProcessingRequest({ requestContext, error }) {
          console.log('unexpectedErrorProcessingRequest', error);
        },

        async contextCreationDidFail({ error }) {
          console.log('contextCreationDidFail', error);
        },

        async invalidRequestWasReceived({ error }) {
          console.log('invalidRequestWasReceived', error);
        },

        async startupDidFail({ error }) {
          console.log('startupDidFail', error);
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        console.log('build context')
        // throw Error('context error');
        return {};
      },
    }),
  );

  return app;
}

let appCache: Express;

async function server(): Promise<Express> {
  if (appCache) {
    return appCache;
  }

  console.log('Creating app ...');
  const app = await createApp();
  console.log('Created app!!!');
  appCache = app;

  return app;
}

const port = 4000;

server()
  .then((app) => app.listen(port))
  .then(() => console.log(`🚀 Server ready at http://localhost:${port}/graphql`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

