const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const data = [
  {
    id: '1',
    text: 'todo 1',
    isCompleted: false,
    createdAt: '2019-01-01',
  },
];

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/:state', (req, res) => {
  const { state } = req.params;
  if (state === 'active') {
    const newData = data.filter((item) => !item.isCompleted);
    return res.send(newData);
  }
  if (state === 'completed') {
    const newData = data.filter((item) => item.isCompleted);
    return res.send(newData);
  }

  return res.send(data);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  console.log('text: ',text)

  const body = {
    id: uuidv4(),
    text,
    isCompleted: false,
    createdAt: new Date().toLocaleString(),
  };

  data.push(body);

  res.send(data);
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { text, isCompleted } = req.body;

  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send('Not found');
  }

  data[index] = {
    ...data[index],
    text,
    isCompleted,
  };

  return res.send(data);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send('Not found');
  }

  data[index] = {
    ...data[index],
    isCompleted: !data[index].isCompleted,
  };

  return res.send(data);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).send('Not found');
  }

  data.splice(index, 1);

  return res.send(data);
});

module.exports = router;
