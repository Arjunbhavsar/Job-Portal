# Quick-Pick-Sprint 4-Byun

- Tested on a separate test heroku app and it works
- All the URL's have been changed. The code is ready to be deployed on heroku.

----

- [Frontend] Created .env file
	- No more searching through all files in the frontend to switch the URL of the backend api call.
	- It is all handled in the .env file
	- All you need to change is REACT_APP_API_URL value and everything will be handled from there.

- [Backend] SpringSecurityConfigurationBasicAuth.java
	- I tested it and line 17 can be left in when deploying
		- I'm talking about this line:
			- http.headers().frameOptions().disable(); // this is for h2 database
	- It seems like the only thing we need to worry about when deploying the backend is the application.properties file

----

- Profile UI update
- Added job lists in profile
	- Working on adding editing
