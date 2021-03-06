const MacAdress = require('../model/MacAdress');

exports.create =  (req,res) =>{
    if(!req.body.idproblem){
        return res.status(400).send({
            message: "Mac content can not be empty"
        });
    }
    const mac = new MacAdress({
        idproblem:req.body.idproblem,
        macAdress:req.body.macAdress
        


    });
    mac.save()
        .then(data=>{
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error ocurred while creating the Problem."
            });
    });
};


exports.findAll = (req, res) => {
    MacAdress.find()
        .then(macs => {
            res.send(macs);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving problems."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    MacAdress.findById(req.params.macAdress)
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macAdress
                });
            }
            res.send(mac);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macAdress
            });
        }
        return res.status(500).send({
            message: "Error retrieving problem with id " + req.params.macAdress
        });
    });
};

exports.findMac = (req, res)=>{

    const urlParameter = req.params.macAdress;

   MacAdress.find({'macAdress': urlParameter},(err,mac)=>{
        if(err){
            return handle(err);
        }
        else
            res.send(mac);
    });
}

// Update a PROBLEM identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.idproblem) {
        return res.status(400).send({
            message: "Mac description can not be empty"
        });
    }

    // Find Problem and update it with the request body
    MacAdress.findByIdAndUpdate(req.params.macAdress, {

        idproblem:req.body.idproblem,
        macAdress:req.body.macAdress
        
    }, {new: true})
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macAdress
                });
            }
            res.send(mac);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macAdress
            });
        }
        return res.status(500).send({
            message: "Error updating problem with id " + req.params.macAdress
        });
    });
};

// Delete a note with the specified macId in the request
exports.delete = (req, res) => {
    MacAdress.findByIdAndRemove(req.params.macAdress)
        .then(mac => {
            if(!mac) {
                return res.status(404).send({
                    message: "Problem not found with id " + req.params.macAdress
                });
            }
            res.send({message: "Problem deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Problem not found with id " + req.params.macAdress
            });
        }
        return res.status(500).send({
            message: "Problem not delete note with id " + req.params.macAdress
        });
    });
};

