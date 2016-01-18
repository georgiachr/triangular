# General Notes:
1. This application currently works only for Administrator user roles.
2. We keep asynchronous code tidy (avoid callback hell) by using .then and Q for nested promises
3. Using Fat Model Thin Controller as a design structure.

## API (Sails)

### Services/Packages
- bcryptPassword: 'bcrypt' package installed as a service for password encryption
1. We used Synchronous bcrypt methods in combination with Q.fcall(). This results to promisable functions.
2. Functions: encryptPassword, comparePassword (promisable)
3. passwordSaltLength defined in globals.js (10 digits for now)

- jwtToken: 'jsonwebtoken' package installed as a service for tokens
1. Token structure: Payload (key is 'userid'), Salt and Other options (ex. expirationTime)
2. Functions: issueToken, tokenExpiresInMinutes, decodeToken, verifyToken(ASYNC)
3. Define tokenExpirationInMinutes and tokenSalt in globals.js

- UserDBResultsManagingFunctions, VideoDBResultsManagingFunctions
1. Further processing.

- UserValidations, VideoValidations : Validate request object
1. If request object has the necessary parameters
2. If those parameters are not undefined
3. Parameters match model attribute types.

### Controllers
- TokenController
1. Nothing implemented yet.

- VideoController
1. videoList: returns a list of video based on skip and page values (from client). Total number of distinct video records is also returned.
2. Currently used only for read purposes. You can't add a new video, just read records - statistics from database.
3. Video model supports MySQL commands (ex. DISTINCT)

- UserController
1. addUser: Encrypts user's password. If password encryption (bcryptPassword's encryptPassword) successful then creates a new user.
2. initiateResetPassword: if user found (based on email), then issue a temporary token. Finally update user's token.
3. changePassword: if token match token in the database then encrypt user's new password and save it into the database.
4. userList: returns a list of users based on skip and limit values (from client). Total number of users is also returned.
5. loginExistedUser:
6. logout: delete user's token.
7. login: check passwords (given and database). If match issue a new token.
8. removeUser: delete a user record from the database.

### Policies
- isTokenAuthorized:
1. If there is an [X-Auth-Token] header authentication tag
2. Check if header token is valid ('verifyToken' function)
3. Extract userid from header token
4. Find User having userid
5. Check if user's database token and header token match.
6. Attach user record on request object (req.options)
7. Call next policy or model action

- isUserAdmin:
1. isTokenAuthorized is a required policy.
2. Extract user's role from request object (given from isTokenAuthorized).
3. Checks if this role is 'Administrator'
4. Call next policy or model action.

## ANGULAR
