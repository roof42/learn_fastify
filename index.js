const fastify = require('fastify')({ logger: true })
const dbConnector = require('./postgres-connector')
const firstRouter = require('./our-first-route')

fastify.register(dbConnector)
fastify.register(firstRouter)

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()