const express = require("express")
const uuid = require("uuid")
const app = express()
const port = 3000
app.use(express.json())
const users = []
const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id )
    if ( index < 0 ) {
        return response.status(404).json({ error: "User not found "})
    }
    request.userIndex = index
    request.userId = id
    next()
}

const myFirstMiddleware = (request, response, next) => {
    console.log("Fui chamado")
    next()
    console.log("Finalizamos")
}

app.get("/users", (request, response) => {
    return response.json(users)

})
app.post("/users", (request, response) => {
    const { order, clientName, price, status } = request.body
    const user = { id: uuid.v4(), order, clientName, price, status }
    users.push(user)
    return response.status(201).json(user)
})
app.put("/users/:id", checkUserId, (request, response) => {
    const { order, clientName, price, status } = request.body
    const index = request.params
    const id = request.params

    const updateOrder = { id, order, clientName, price, status }

    if (index < 0) {
        return response.status(404).json({ Message: "Order not found" })
    }

    users[index] = updateOrder

    return response.json(updateOrder)
})

app.delete("/users/:id", checkUserId,(request, response) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ Message: "Order not found" })
    }

    users.splice(index, 1)
    return response.status(204).json()
})






app.listen(port, () => {
    console.log(`O Servidor foi aberto na porta ${port}`)
})