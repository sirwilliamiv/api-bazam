const { Router } =require('express');
const router = Router();
const { createUser } =require('../controllers/userCtrl');


router.post('/user/new', createUser)


module.exports = router;
