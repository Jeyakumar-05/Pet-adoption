const express = require('express');
const router = express.Router();
const { getPets, addPet, deletePet } = require('../controllers/petController');

router.route('/').get(getPets).post(addPet); 
router.route('/:name').delete(deletePet); 
module.exports = router;



