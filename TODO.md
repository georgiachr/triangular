##General issues:
- Merge doTokensMatch policy with isTokenAuthorized policy
- Add functionality for multiple Tokens per user to support parallel logins from different browsers
- Add TIME, TIME TO LEAVE, NEAR TIME TO EXPIRE into sails.config.globals (used for tokens)
- Modify jwtToken methods to be PROMISABLE methods.
- Modify isTokenAuthorized and other policies with web sockets.
- Web Sockets
- documentation for client (Angular)
- documentation for User model and services.

##API:
### Videos
1. Change database (add formal Teleprometheus database). Current database is a testing one holding video records for a short period of time.
2. Return video list based on search (by date).
3. Return video list based on total views (ASC/DESC).
4. Top videos of all time.

### Users
1. Change everything to work using web sockets.
2. Implement many tokens for a user.
3. The tokens in the forgot password procedure should be short-time valid.
4. Add email verification for forgot password.
5. updateUser: currently works using callbacks. Use promises instead.
6. Logout: currently works using callbacks. Use promises instead.
7. login: currently works using callbacks. Use promises instead. Also user bcryptPassword to check passwords.
8. create onlineUsers room (using with web sockets).

### Tokens
1. Add functionality for multiple Tokens per user to support parallel logins from different browsers (1-N association)

##Client side (Angular):
### Users
1. Update user capability.

### Videos
1. Add search capability (based on date).
2. List videos based on total views.
3. Bar chart of 5 top videos of all time
4. Line chart of the top video (views per date)

##Views/Templates:
### Users
1. Add modal window with attributes for update user.

### Videos
1. Add bar chart for top 5 videos.
2. Add line hart for the top video.
3. Add search capability for videos.