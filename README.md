
# Quick-Pick-Sprint 5-Byun (v3) (tested locally and it's really jank)

***I didn't sleep, I'm gonna go sleep now..***
## New Features
- Reworked the shift model many times and hopefully this one is finalized
- Added new shift page with interactive UI.
	- It is completely private and is not like how profile and resume can be viewed
	- You can add and delete shifts.
	- I'm trying to remove the edit button b/c of how buggy it is already so you can click it, but it will basically pull up another form
## Known Bugs
- Profile locks you out if there is a space in the username
	- This is because it is pulling the name from the url and if there is a space there it will show as "%20"
	- We can either prevent people from making names with spaces or just check for spaces in the url
	- Replicate:
		- Have a username with a space
		- Go to profile once logged in
		- Observe that you can't edit anymore and applied jobs no longer shows
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
