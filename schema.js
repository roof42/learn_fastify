const allTodos = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id', 'name', 'createdAt', 'important', 'dueDate', 'done'],
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    createdAt: { type: 'string', format: "date-time" },
                    important: { type: 'boolean' },
                    dueDate: { type: 'string', format: "date-time" },
                    done: { type: 'boolean' },
                }
            }
        }
    }
}