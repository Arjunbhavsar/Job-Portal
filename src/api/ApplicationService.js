import axios from 'axios'
import output from './connections';

class ApplicationService{
	state = {  
		appsTag : output + '/apps/'
    }
    executeApplication(application){
		const {appsTag} = this.state;
		let username = 'user'
		let password =  'password'
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
		return axios.post(appsTag+'apply', application,
        {
            headers:{
                authorization: basicAuthHeader
            }
        })
    }

    getAllApplied(){
		const {appsTag} = this.state;
        let username = 'user'
		let password = 'password'
		let currentUserId = sessionStorage.getItem('authenticatedUserId');
        let basicAuthHeader = 'Basic '+ window.btoa(username+':'+password)
		return axios.get(appsTag+'userApplications/'+ currentUserId, {
				headers:{
					authorization: basicAuthHeader
				}
			}
        )
	}
    
    checkApplied(application){
        const {appsTag} = this.state;
		let username = 'user'
		let password =  'password'
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
		return axios.post(appsTag +'checkIfApplied', application,
        {
            headers:{
                authorization: basicAuthHeader
            }
        })
    }
}

export default new ApplicationService();