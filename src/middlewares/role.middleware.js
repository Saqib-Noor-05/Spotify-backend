const jwt = require('jsonwebtoken')

async function authUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(403).json({ message: " Unauthorised" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            res.status(200).json({
                message: "you dont have access to get all music",


            })
        }
        next();
    }
    catch (err) {
        res.status(403).json({ message: " Unauthorised" })

    }

}
module.exports = { authUser };