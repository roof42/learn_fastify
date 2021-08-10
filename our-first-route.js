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

    fastify.post('/', { schema: addTodo }, async  (request, reply) => {
        const { name, important, dueDate } = request.body
        const id = uuidv4()
        const done = false
        createdAt = new Date().toISOString()
        const query = {
            text: `INSERT INTO todos (id, name, "createdAt", important, "dueDate", done)
                                VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
            values: [id, name, createdAt, important, dueDate, done],
        }
        try {
            const { rows } = await client.query(query)
            console.log(rows[0])
            reply.code(201)
            return { created: true }
        } catch (err) {
            throw new Error(err)
        }

    })

}

module.exports = routes