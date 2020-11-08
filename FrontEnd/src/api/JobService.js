import axios from 'axios'

class getJobListService{
	state = {  
		// jobTag : 'http://localhost:9090/job/'
		jobTag : 'https://quick-pick1.herokuapp.com/job/'
		// jobTag : 'https://backend-test-quickpick.herokuapp.com/job/'
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
		let user = sessionStorage.getItem('authenticatedUser');
		
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(jobTag+'createJob/'+user,job,
        {
            headers:{
                authorization: basicAuthHeader
            }
        })
    }
}




export default new getJobListService();