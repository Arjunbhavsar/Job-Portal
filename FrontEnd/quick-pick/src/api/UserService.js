import axios from 'axios'

class getUsersListService{
	state = {  
		//userTag : 'https://quick-pick1.herokuapp.com/user/'
		userTag : 'http://localhost:9090/user/'
	}

    executeGetUserListService(){
		const {userTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(userTag+'getUsers',
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}
	
	executeGetUserService(username) {
		const {userTag} = this.state;

		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return axios.get(userTag+'getUser/'+username,
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		)
	}
   
    executePostUserRegisterService(user){
	const {userTag} = this.state;
    let username = 'user'
	let password =  'password'
		
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(userTag+'register',user,
        {
            headers:{
                authorization: basicAuthHeader,
				'Content-Type': 'application/json'
            }
        }
        )
    }

	executePostUserFacebookRegisterService(user){
		const {userTag} = this.state;
		let username = 'user'
		let password =  'password'
			
			let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
			return axios.post(userTag+'register',user,
			{
				headers:{
					authorization: basicAuthHeader,
					'Content-Type': 'application/json'
				}
			}
			)
		}

    registerLogin(user) {
		const {userTag} = this.state;
        let username = 'user'
        let password = 'password'
        console.log(user)
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post(userTag+'login', user , {
				headers:{
					authorization: basicAuthHeader
				}
			}
        )
    }
}




export default new getUsersListService();
