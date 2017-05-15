const { Router } = require('express');
const router = Router();
const { createSong, deleteSong, getAllSongs } = require('../controllers/songCtrl');
const { acrRequest } =require('../controllers/findCtrl');


router.post('/song/new', createSong);
router.post('/song/find/:base64', acrRequest)
router.get('/song/:id', getAllSongs);
router.delete('/song/delete/:id', deleteSong);



module.exports = router;
