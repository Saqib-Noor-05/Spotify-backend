const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorised Access" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(403).json.message({ message: "You dont have access" })
        }
        req.user = decoded;
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            message: "You are not authorised "
        })

    }
}

module.exports = { authArtist }