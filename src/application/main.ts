import Koa, {DefaultContext, DefaultState} from 'koa'
import json from 'koa-json'
import { ApolloServer } from 'apollo-server-koa'

import config from './common/config'
import { router } from './routes'
import { schema } from './schema'
import { resolvers } from '../infrastructure/api/graphql/resolvers'

async function main() {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        debug: true,
        // playground: true, // Habilita a interface GraphQL Playground para testes
    })

    const app = new Koa<DefaultState, DefaultContext>({  })
    app.context.config  

    // rest api
    app.use(json())
    app.use(router.routes()).use(router.allowedMethods())

    // graphql api
    await server.start()
    server.applyMiddleware({ app });

    app.listen(config.APP_PORT, () => console.log(`Server running and listen http://localhost:${config.APP_PORT}${server.graphqlPath}`))
}

main().catch((e) => console.log(e.message))