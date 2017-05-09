const { Router } = require('express');
const router = Router();
const { createUser } =require('../controllers/userCtrl');


router.post('/user/new', createUser)

// {
//     "name": "steve",
//     "song": "blimp@bubs.com",
//     "password": "xoiasHASLKASDf923KASDL"
// }


module.exports = router;
