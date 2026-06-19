const express = require('express')
const router = express.Router();
const musicController = require('../Controllers/music.controller')
const authMiddleware = require('../middlewares/auth.middlewares')
const roleMiddleware = require('../middlewares/role.middleware')

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
router.post("/upload", authMiddleware.authArtist, upload.single("music"), musicController.createMusic)
router.post("/uploadAlbum", authMiddleware.authArtist, musicController.createAlbum)
router.get("/", roleMiddleware.authUser, musicController.getallmusic)
router.get("/albums", roleMiddleware.authUser, musicController.getalbums)
router.get("/albums/:albumId", musicController.getalbumById)
// router.get("/", musicController.getallmusic)

module.exports = router;