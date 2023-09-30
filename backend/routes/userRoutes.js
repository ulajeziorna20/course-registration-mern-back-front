const express = require("express");
const router = express.Router();



const viewController = require('../controllers/userController'); 

router.get('/', viewController.allUsers); 



module.exports = router; 