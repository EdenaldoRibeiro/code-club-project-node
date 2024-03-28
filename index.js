const express = require('express')
const port = 3020
const uuid = require('uuid')
const app = express()
app.use(express.json())

const users = []


const checkUserId = (request, response, next) =>{
    
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0 ) {
        return response.status(404).json({message: 'User not Found'})
    }

    request.userIndex = index
    request.UserId = id

    next()
}

app.get('/users', (request, response) => {
        
 return response.json(users)
    
})

app.post('/users', (request, response) => {
    const {name, age, contacts } = request.body
    
   const user = { id:uuid.v4() ,name, age, contacts} 
     
    users.push(user)

    return response.status(201).json(user)
    
})

app.put('/users/:id', checkUserId, (request, response) => {

    
    const {name, age, contacts} = request.body
    const index = request.userIndex
    const id = request.UserId
   
    const updatedUser = { id, name, age, contacts}

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id',checkUserId,  (request, response) =>{
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()

})


app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
})