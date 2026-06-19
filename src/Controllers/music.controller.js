const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const authArtist = require('../middlewares/auth.middlewares')
const { uploadFile } = require('../services/storage.services')
const jwt = require('jsonwebtoken')

async function createMusic(req, res) {
    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        url: result.url,
        title,
        artist: req.user._id

    })


    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            url: music.url,
            title: music.title,
            artist: music.artist,


        }
    })
}

async function createAlbum(req, res) {
    const { title, musics } = req.body
    const album = await albumModel.create({
        title,
        musics: musics,
        artist: req.user._id
    })
    console.log(album.title)
    res.status(201).json({
        message: "Album Successfully created",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })
}
async function getallmusic(req, res) {
    const musics = await musicModel.find()
        .skip(10)
        .limit(10)
        .populate("artist", "email");
    // populate("artist")
    res.status(200).json({
        message: "All music list are : ",
        musics: musics,
    })
}
async function getalbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "email username ")
    res.status(200).json({
        message: "Albums fetched Succesfully",
        album: albums
    })




}
async function getalbumById(req, res) {
    const albumId = req.params.albumId
    const album = await albumModel.findById(albumId)
    return res.status(200).json({
        message: "Resulted Album be",
        albums: album

    })
}
module.exports = { createMusic, createAlbum, getalbums, getallmusic, getalbumById }