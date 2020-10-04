import axios from 'axios'


class getUsersListService{
    executeGetUserListService(){
      
        return axios.get('http://localhost:9090/user/getUsers')
    }
   
    executePostUserRegisterService(user){

        let username = 'user'
        let password =  'password'

        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post('http://localhost:9090/user/register',user,
        {
            headers:{
                authorization: basicAuthHeader
            }
        }
        )
    }

    registerLogin(user){

        let username = 'user'
        let password = 'password'
        console.log(user)
        let basicAuthHeader = 'Basic '+window.btoa(username+':'+password)
        return axios.post('http://localhost:9090/user/login', user ,
        {
            headers:{
                authorization: basicAuthHeader
            }
        }
        )


    }
}




export default new getUsersListService();