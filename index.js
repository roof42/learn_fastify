const fastify = require('fastify')({ logger: true })
const dbconnector = require('./postgres-connector')

fastify.register(dbconnector)
fastify.register(require('./our-first-route'))

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()