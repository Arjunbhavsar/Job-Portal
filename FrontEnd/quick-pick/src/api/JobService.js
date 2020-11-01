import axios from 'axios'

class getJobListService{
	state = {  
		jobTag : 'http://localhost:9090/job/'
	}
// UNIQUE_ID  	COUNTRY  	DATE_ADDED  	HAS_EXPIRED  	JOB_BOARD  	JOB_DESCRIPTION  	JOB_SALARY  	JOB_TITLE  	JOB_TYPE  	LOCATION  	ORGANIZATION  	PAGE_URL  	SECTOR
    executeGetJob(jobID){
        const {jobTag} = this.state;
        let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

	   return axios.get(`${jobTag}getJob/${jobID}`,{
		   headers:{
			   authorization: basicAuthHeader
		   }
	   })
    }

	executeGetJobListService() {
		const {jobTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(jobTag+'getAllJobs',
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}
}




export default new getJobListService();