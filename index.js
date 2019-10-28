const express = require('express');

const users = require('./data/hubs-model')

const server= express();

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
})

server.get('/users', (req, res) => {
  users.find()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((error) => {
    res.status(500).json({message: "unable to get users"})
  })
})

server.listen(8000, () => {
  console.log('API running on port 8000')
})