const express = require("express");
const router = express.Router();



const viewController = require('../controllers/userController'); 

router.get('/', viewController.allUsers); 
router.post('/addUser', viewController.create);


module.exports = router; 