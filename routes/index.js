'use strict'

const { Router } require('express');
const router = Router();

router.use(require('./songs'))
router.use(require('./users'))
// router.get('/', (req,res) => {
//   res.json({
//     'songs': url here,
//     'users': url here
//   })
// })
