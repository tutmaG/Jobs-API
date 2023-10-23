const mongoos = require('mongoose')

const jobSchema = new mongoos.Schema({
    company:{
        type:String,
        required:[true , "Please provide company name"],
        maxlength: 50,
    },
    position:{
        type:String,
        required:[true , "Please provide position"],
        maxlength: 100,
    },
    status:{
        type:String,
        enum:['interview' , 'declined', 'pending'],
        default:"pending",
    },
    createdBy:{
        type:mongoos.Types.ObjectId,
        ref:"User",
        required:[true , 'Pleas provide user']
    }
    
},{timestamps:true})


module.exports = mongoos.model('job', jobSchema)