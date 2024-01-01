const jwt = require('jsonwebtoken')

const middlewareController = {

    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json(
                        {
                            message: "Token is not valid."
                        }
                    )
                }
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json(
                {
                    message: "You are not authenticated."
                }
            )
        }
    },

    // verify Token and owner
    verifyTokenAndOwner: async (req, res, next) => {
        middlewareController.verifyToken(req,res,()=>{
            
        })
    }
}

module.exports = middlewareController