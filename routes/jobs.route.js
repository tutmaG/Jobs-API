const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    delateJob,
    } = require('../controllers/jobs.cont')

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getSingleJob).delete(delateJob).patch(updateJob)


module.exports = router