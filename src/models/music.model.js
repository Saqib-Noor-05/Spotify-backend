const mongoose = require('mongoose')
const musicSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spotify-User",
        required: true
    }


})

const musicModel = new mongoose.model("musics", musicSchema)

module.exports = musicModel;