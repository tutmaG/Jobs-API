const User = require('../models/User.model')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError}  = require('../errors')


const register = async(req,res) =>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {name:user.name , id:user._id}, token })
}

const login = async(req,res) =>{
    const {email , password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and passwod')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name,id:user._id},token})
}

module.exports = {
    register,
    login,
}