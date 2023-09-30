const express = require("express");
const router = express.Router();



const viewController = require('../controllers/userController'); 

router.get('/', viewController.allUsers); 
router.post('/addUser', viewController.create);
router.delete('/delete/:id', viewController.delete);
router.put('/edit/:id', viewController.update);

router.get('/sortUp', viewController.filtrNameUp);
router.get('/sortDown', viewController.filtrNameDown);
router.get('/sortCityUp', viewController.filtrCityUp);
router.get('/sortCityDown', viewController.filtrCityDown);
router.get('/sortCourseUp', viewController.filtrCourseUp);
router.get('/sortCourseDown', viewController.filtrCourseDown);

module.exports = router; 