const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if(token){
          const decode = jwt.verify(token,process.env.secret_key)
          req.userId = decode.userId
          next()
        }else{
            res.status(401).send({msg:'authentication required, please login'})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}

module.exports = auth