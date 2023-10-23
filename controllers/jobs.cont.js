const Jobs = require('../models/Job.model')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError,BadRequestError} = require('../errors')

const getAllJobs = async(req,res) =>{
    const jobs = await Jobs.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({count:jobs.length , jobs,user:{name: req.user.name ,id: req.user.userID}})
}

const getSingleJob = async(req,res) =>{
    const {user:{userID},params:{id:jobID}} = req
    const job = await Jobs.findOne({_id:jobID,createdBy:userID})
    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({job:job,user:{name: req.user.name ,id: req.user.userID}})
} 

const createJob = async(req,res) =>{
    req.body.createdBy = req.user.userID
    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job,user:{name: req.user.name ,id: req.user.userID}})
}

const updateJob = async(req,res) =>{ 
    const {body:{company,position}, user:{userID}, params:{id:jobID}} = req
    if(company === '' || position === ''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Jobs.findOneAndUpdate({_id:jobID, createdBy:userID}, req.body, {new:true, runValidators:true})

    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({updated:job,user:{name: req.user.name ,id: req.user.userID}})
}

const delateJob = async(req,res) =>{
    const {body:{company,position}, user:{userID}, params:{id:jobID}} = req
    const job = await Jobs.findOneAndRemove({_id:jobID, createdBy:userID})

    if(!job){
        throw new NotFoundError(`No job with id ${jobID}`)
    }
    res.status(StatusCodes.OK).json({delated:job,user:{name: req.user.name ,id: req.user.userID}})
}


module.exports = {
    getAllJobs, 
    getSingleJob,
    createJob,
    updateJob,
    delateJob,
}