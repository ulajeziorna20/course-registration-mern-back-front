const express = require("express");
const router = express.Router();



const viewController = require('../controllers/userController'); 

router.get('/', viewController.allUsers); 
router.post('/addUser', viewController.create);
router.delete('/delete/:id', viewController.delete);
router.put('/edit/:id', viewController.update);

module.exports = router; 