const { Router } = require('express');
const router = Router();
const { createSong, deleteSong, getAllSongs } =require('../controllers/songCtrl');


router.post('/song/new', createSong);
router.get('/song/:id', getAllSongs);
router.delete('/song/delete/:id', deleteSong);


module.exports = router;
