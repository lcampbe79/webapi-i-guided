const express = require('express');

const users = require('./data/hubs-model')

const server= express();

//middleware
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ]
  res.status(200).json(hobbits)
});

//same as getting users
server.get('/hubs', (req, res) => {
  users.find()
  .then(hubs => {
    res.json(hubs)
  })
  .catch(err => {
    res.json({message: "Failed to get hubs from DB"})
  })
})

server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  console.log('hub info', hubInfo)

  users.add(hubInfo)
  .then(hub => {
    res.status(201).json(hub)
  })
  .catch(err => {
    res.status(500).json({message: "Failed to add hubs from DB"})
  })
})

server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  users.remove(id)
  .then(count => {
    res.status(200).json({message: `hubs with id ${id} deleted`})
  })
  .catch(err => {
    res.status(500).json({message: "Failed to delete hubs from DB"})
  })
})

server.get('/users', (req, res) => {
  users.find()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({message: "unable to get users"})
  })
});

server.listen(8000, () => {
  console.log('API running on port 8000')
});