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
const macadress = require('../Controller/MacAdressController');

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


// Create a new user
router.post('/user', user.create);

// Retrieve all User
router.get('/user', user.findAll);

// Retrieve a single User with UserId
router.get('/user/:userId', user.findOne);

// Update a User with UserId
router.put('/user/:userId', user.update);

// Delete a User with userId
router.delete('/user/:user', user.delete);

// get a user with registred in mac adress in api
router.get('/user/mac/:uniqueId', user.findMac);


// Create a new mac
router.post('/mac', macadress.create);

// Retrieve all macs
router.get('/mac', macadress.findAll);

// Retrieve a single MacAdress with macId
router.get('/mac/:macAdress', macadress.findOne);

// Update a Problem with macId
router.put('/mac/:macAdress', macadress.update);

// Delete a Note with macId
router.delete('/mac/:macAdress', macadress.delete);

module.exports = router;


