# Quick-Pick-Sprint 5-Byun (tested locally as of now)

## Added Changes
- I changed all instances primary key @Id names to simply "id"
	- So "uniqueId" is simply "id" for clarity and becasue heroku didn't recognize it as a string for some reason
	- Any instance of a string with both 'I' and 'D' capitalized have been changed so 'D' is lowercase
		- So 'ID' to "Id". Again this is for clarity and so everything is uniform.
		- For example "jobID" is now "jobId" and "authenticatedUserID" is now "authenticatedUserId"
- Backend for shift setup
	- Shift model, dao, controller, service added
- Profile viewing added
	- Can view other people's profiles now by changing the url
	- As of now you can only view profiles when logged in
		- Can easily change this
	- When on other profiles you will have limited functionality
		- You cannot upload images/resume
		- You cannot view their applied jobs
		- You cannot edit information

## Known Bugs
- User can sign up with the same email
	- Replicate:
		- Go to register
		- Enter an email address that already exists
		- Sign up
- Inconsistent font from landing page to other pages
	- Replicate:
		- Go to landing page
		- Go to any other page
		- Click refresh and observe the font
			- It is most noticeable for the navbar
- Email login doesn't work
	- Replicate
		- Go to login page
		- Login with existing email and password
- Applying for jobs still has bug where the pending message doesn't go away
	- Replicate:
		- Go to dashboard (must have more than 1 job)
		- Apply to a job and observe the message that shows
		- Click on a different job and observe the message
- Profile Image uploading spam in backend
	- Replicate:
		- Replace an existing image on profile
		- Check backend and there should be two versions that were uploaded

## Known Issues
- Can't change email
	- Email changing is currently locked
	- This is due to the fact that people who sign in through Gmail will get locked out if they change their email
- No error message if username exists for profile and signup
	- Replicate on Profile:
		- Go to profile page
		- Update username to an existing username
		- No error message is shown
	- Replicate on Register:
		- Go to register
		- Enter an username that already exists
		- Sign up
