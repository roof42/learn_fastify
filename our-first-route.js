const {allTodos, addTodo, updateTodo, deleteTodo} = require('./schema')
const { v4: uuidv4 } = require('uuid')

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

    fastify.post('/', { schema: addTodo }, async (request, reply) => {
        const { name, important, dueDate } = request.body
        const query = {
            text: `INSERT INTO todos (id, name, "createdAt", important, "dueDate", done)
                    VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
            values: [uuidv4(), name, new Date().toISOString(), important, dueDate, false],
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

    fastify.patch('/:id', { schema: updateTodo }, async function (request, reply) {
        const id = request.params.id
        const { important, dueDate, done } = request.body
        const query = {
            text: `UPDATE todos SET 
                                important = COALESCE($1, important), 
                                "dueDate" = COALESCE($2, "dueDate"), 
                                done = COALESCE($3, done) 
                                WHERE id = $4 RETURNING *`,
            values: [important, dueDate, done, id]
        }
        try {
            const { rows } = await client.query(query)
            console.log(rows[0])
            reply.code(204)
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: deleteTodo }, async function (request, reply) {
        console.log(request.params)
        try {
            const { rows } = await client.query(`DELETE FROM todos WHERE id = $1 RETURNING *`,
                [request.params.id])
            console.log(rows[0])
            reply.code(204)
        } catch (err) {
            throw new Error(err)
        }
    })

}

module.exports = routes