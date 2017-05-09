'use strict'

const { Router } = require('express');
const router = Router();

router.use(require('./songs'))
router.use(require('./users'))

router.get('/', (req,res) => {
  res.json({
    'songs': `https://localhost:3000/api/v1/songs/`,
    'users': `https://localhost:3000/api/v1/users/`
  })
})

module.exports = router;
