const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'MentionsAPI',
    version: '1.0.0'
  });
});

const problem = require('../Controller/ProblemController');
const user = require('../Controller/UserController');

// Create a new problem
router.post('/problem', problem.create);

// Retrieve all problems
router.get('/problem', problem.findAll);

// Retrieve a single Problem with problemId
router.get('/problem/:problemId', problem.findOne);

// Update a Problem with problemId
router.put('/problem/:problemId', problem.update);

// Delete a Note with problemId
router.delete('/problem/:problemId', problem.delete);

// Retrieve all Problems where city
router.get('/problem/city/:cityUser',problem.findCity);


// Create a new Note
router.post('/user', user.create);

// Retrieve all Notes
router.get('/user', user.findAll);

// Retrieve a single Note with noteId
router.get('/user/:userId', user.findOne);

// Update a Note with noteId
router.put('/user/:userId', user.update);

// Delete a Note with noteId
router.delete('/user/:user', user.delete);


module.exports = router;


