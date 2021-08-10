const allTodos = require('./schema')
async function routes(fastify, options) {
    const client = fastify.db.client
    fastify.get('/', { schema: allTodos }, async (request, reply) => {
        try {
            const { rows } = await client.query('SELECT * FROM todos')
            console.log(rows)
            reply.send(rows)
        } catch (err) {
            throw new Error(err)
        }
    })

}

module.exports = routes