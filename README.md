
# Quick-Pick-Sprint 5-Byun (v2) (tested Heroku, it works!!)

***please keep my file structure for the profile folder***
## New Features (the ones I can remember)
- PDF viewing added
	- New page added with that uses 'path/resume/user'
- Component for deleting Jobs/Applications added
	- When a job is deleted all associated applications get deleted as well
	- The backend has been updated as well to do this
- Profile page address uses google places API for autofilling locations
	- Don't spam it, idk when it's gonna charge me...
## Updates/Bug Fixes (the ones I can remember)
- ProfileUploader.js UI update
	- No longer clips into the username
	- Has tinted background on hover
- ResumeUploader.js UI update
	- It looks better
- Fixed bug with ProfileJobList.js because it was pulling wrong information for AppliedJobList
## Known Bugs
- Profile locks you out if there is a space in the username
	- This is because it is pulling the name from the url and if there is a space there it will show as "%20"
	- We can either prevent people from making names with spaces or just check for spaces in the url
	- Replicate:
		- Have a username with a space
		- Go to profile once logged in
		- Observe that you can't edit anymore and applied jobs no longer shows
- Inconsistent font from landing page to other pages
	- Replicate:
		- Go to landing page
		- Go to any other page
		- Click refresh and observe the font
			- It is most noticeable for the navbar or the '+' for the upload profile
- Profile Image uploading spam in backend
	- Replicate:
		- Replace an existing image on profile
		- Check backend and there should be two versions that were uploaded
## Known Issues
- ctrl+click will open link in new tab but we lose our session
- when you move from landing page to profile, there is a font that is applied for some reason which shows when you hover over the profile image
- User can't change email
	- Email changing is currently locked
	- This is due to the fact that people who sign in through Gmail will get locked out if they change their email
	- We could keep it this way or change the backend
- No error message if username exists for profile/the register fields
	- Replicate on Profile:
		- Go to profile page
		- Update username to an existing username
		- No error message is shown
	- Replicate on Register:
		- Go to register
		- Enter an username that already exists
		- Sign up
## Suggestions
- searching should only disappear when on the landing page, I feel people should be able to search whenever
