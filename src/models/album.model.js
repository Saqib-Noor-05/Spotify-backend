const mongoose = require('mongoose')
const albumSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "musics"
        // required: true
    }],

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spotify-User",
        required: true
    }
})


const albumModel = new mongoose.model("album", albumSchema)

module.exports = albumModel