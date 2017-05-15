'use strict'

const { Router } = require('express');
const router = Router();

router.use(require('./songs'))
router.use(require('./users'))

router.get('/', (req,res) => {
  res.json({
    'songs': `https://vast-cove-65313.herokuapp.com/api/v1/song/`,
    'users': `https://vast-cove-65313.herokuapp.com/api/v1/user/`
  })
})

module.exports = router;
