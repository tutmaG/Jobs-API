This is Jobs API application. You can register or use demo user:
email: nika@gmail.com
password: nika

This application uses MongoDB.
You will need some tool to handle HTTP requests (for example Postman)
There are 7 API routes in this application. register, login, Get all job, get single job, create job, update job and Delate job.


|================= API Routes ====================== What doing ==== request method ======  body:json ===========|
|                                                                                                                | 
|1.) http://localhost:4000/api/v1/auth/login     --> login user     --  POST    --   {"name","email","password"} |
|                                                                                                                |
|2.) http://localhost:4000/api/v1/register       --> register user  --  POST    --   {"email","password"}        |
|                                                                                                                |
|3.) http://localhost:4000/api/v1/jobs           --> get all jobs   --  GET     --   none                        |
|                                                                                                                |
|4.) http://localhost:4000/api/v1/jobs           --> create job     --  POST    --   {"company","position"}      |   
|                                                                                                                |
|5.) http://localhost:4000/api/v1/jobs/<job_id>  --> get single job --  GET     --   none                        |
|                                                                                                                |                                                                                                            
|6.) http://localhost:4000/api/v1/jobs/<job_id>  --> update job     --  PATCH   --   {"company","position"}      |
|                                                                                                                |
|7.) http://localhost:4000/api/v1/jobs/<job_id>  --> delate job     --  DELATE  --   none                        |
|                                                                                                                |
|===============================================================================================================|

set up :

1.) git clone: https://github.com/tutmaG/Jobs-API.git

2.) run: npm install or npm i

3.) run: npm start

