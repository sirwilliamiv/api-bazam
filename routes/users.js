const { Router } = require('express');
const router = Router();
const { createUser } =require('../controllers/userCtrl');
const { login,logout } =require('../controllers/sessionCtrl');


router.post('/user/new', createUser)
router.post('/user/login', login)
router.post('/user/logout', logout)




module.exports = router;
