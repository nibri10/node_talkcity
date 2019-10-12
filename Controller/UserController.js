const User = require('../model/User');

exports.create =  (req,res) =>{
    if(!req.body.number){
        return res.status(400).send({
            message: "Problem content can not be empty"
        });
    }
    const user = new User({
    number :req.body.number,
    name : req.body.name
    });
    user.save()
        .then(data=>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the User."
            });
    });
};


exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.number) {
        return res.status(400).send({
            message: "Number description can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
      number :req.body.number,
      name : req.body.name
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "User not delete note with id " + req.params.userId
        });
    });
};
