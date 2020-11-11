import http from "../http-common";

class FileService {

	uploadResume(file, onUploadProgress) {
		let formData = new FormData();
		let user = sessionStorage.getItem('authenticatedUser');

		formData.append("file", file);
		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return http.post("/upload/resume/"+user, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			authorization: basicAuthHeader
		},
		onUploadProgress,
		});
	}
	
	uploadProfile(file, onUploadProgress) {
		let formData = new FormData();
		let user = sessionStorage.getItem('authenticatedUser');

		formData.append("file", file);
		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)

		return http.post("/upload/profile/"+user, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
			authorization: basicAuthHeader
		},
		onUploadProgress,
		});
	}

	getFiles() {
		let usernameAuth = 'user'
		let passwordAuth =  'password'
		let basicAuthHeader = 'Basic '+window.btoa(usernameAuth+':'+passwordAuth)
		return http.get("/files",
			{
				headers:{
					authorization: basicAuthHeader
				}
			}
		);
	}
}

export default new FileService();