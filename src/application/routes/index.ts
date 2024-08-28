import Router from 'koa-router'
import { checkConnectionStatus } from '../../infrastructure/databases/connections/mongoose'

const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = {
        message: "I'm alive"
    }
    await next()
})

router.get('/healthcheck', async (ctx, next) => {
    ctx.body = {
        healthcheck: true,
        db: await checkConnectionStatus()
    }

    await next()    
})

export { router }