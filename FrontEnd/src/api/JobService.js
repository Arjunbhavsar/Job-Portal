import axios from 'axios'

class getJobListService{
	state = {  
		jobTag : process.env.REACT_APP_API_URL_JOB
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

	executePostJobService(job){
		const {jobTag} = this.state;
        let username = 'user'
		let password =  'password'
		
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(jobTag+'createJob', job,
        {
            headers:{
                authorization: basicAuthHeader
            }
        })
	}
}




export default new getJobListService();