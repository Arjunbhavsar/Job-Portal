import axios from 'axios'

class ApplicationService{
	state = {  
		appsTag : process.env.REACT_APP_API_URL_APPS,
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
		let currentUsername = sessionStorage.getItem('authenticatedUser');
        console.log("UPDATING INFO : " + currentUsername)
        let basicAuthHeader = 'Basic '+ window.btoa(username+':'+password)
		return axios.get(appsTag+'userApplications/'+ currentUsername, {
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