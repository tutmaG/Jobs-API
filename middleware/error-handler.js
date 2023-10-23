const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Someting went wrong try again later'
  }

  if(err.code && err.code === 11000){
    customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name && err.name === 'ValidationError'){
    customError.message = Object.values(err.errors).map((item)=>item.message)
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
  if(err.name && err.name === 'CastError'){
    customError.message = `No item with id ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }
  
  
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({"Error msg":customError.message})
  
}

module.exports = errorHandlerMiddleware
