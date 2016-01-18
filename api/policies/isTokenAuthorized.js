/**
 * Created by georgia.chr on 14-Sep-15.
 * @summary Checks if there is a token, if is a valid token and if user has the same token stored in the database.
 * @description First, we check request headers - looking for a header called 'X-Auth-Token', which contains a Bearer token_string.
 * If header exists then verify token. If token is valid then we extract its payload (which has user id).
 * Then we search for user having user id from payload and compare their database token with header token.
 * Finally, set response's header as [x-auth-Token] and assign the valid token. The response object is returned back to the client.
 * Furthermore we attach user's record in request object (req.options).
 *
 * @todo modify it to accept web socket requests
 * @version 1.0.0
 * @author Georgia Christodoulou
 */



/**
 * This policy verifies that the token from request header 'X-Auth-Token' is a valid token (as a structure).
 * If token is valid, extract userid from token, find user and then checks if user's stored token match this token.
 * @param {Object} req - request coming from client
 * @param {Object} res - response send to the client
 * @param {Object} next - next policy or controller action
 * @returns {*}
 */
module.exports = function (req, res, next) {

    var header_token;
    var userid;
    var decoded;

    if (req.headers) {

        // if no token header exists then user is not authorized!
        if (req.headers["x-auth-token"] === undefined) {
            sails.log.info("isTokenAuthorized: Token undefined");
            return res.json(401, {err: 'isTokenAuthorized: No Authorization header was found'});
        }
        else {
            header_token = req.headers["x-auth-token"];

            /**
             * if token exists - check token is valid (as a structure).
             * it has nothing to do with user's stored token
             * jwtToken.verifyToken is an Asynchronous function.
             */
            jwtToken.verifyToken(header_token, function (err, token) {

                //not a valid token
                if (err) {
                    return res.json(401, {err: 'isTokenAuthorized: The token is not valid'});
                }
                else {
                // valid token - get userid from it

                    decoded = jwtToken.decodeToken(header_token, {complete: true});

                    userid = decoded.payload.userid;

                    //Find user having userid
                    //Use WATERLINE's predefined query method with PROMISES
                    User.find()
                        .where({ id: userid })
                        .then(function(users){
                            var founduser = users[0];

                            // return error if user not found
                            if (!founduser) {
                                console.log("isUserTokenAuthorized POLICY: No user found from this token!");
                                return res.notFound();
                            }

                            //check if tokens do not match
                            if (founduser.token != header_token) {
                                console.log("isUserTokenAuthorized POLICY: Request Token does not Match User.token!");
                                return res.json(401, {err: 'isUserTokenAuthorized POLICY: Request Token does not Match User.token'});
                            }

                            //tokens match successfully
                            //check if their token is near expiration
                            var mins = jwtToken.tokenExpiresInMinutes(header_token);

                            //save user data using request options
                            req.options.policyparams = req.options.policyparams || {};
                            req.options.policyparams.currentuser = founduser;

                            //sails.log.info('req.options.policyparams.currentuser = ' + JSON.stringify(req.options.policyparams.currentuser));

                            if ( mins < (sails.config.globals.tokenNearTimeExpirationInMinutes-5)) {

                                sails.log.info('isTokenAuthorized: token is expired! ' + mins);
                                var newtoken = jwtToken.issueToken(decoded.payload);

                                User.update(founduser.id,{token: newtoken})
                                    .then(function(updated){
                                        // All done- let the client know the new token.
                                        res.set('X-Auth-Token',newtoken);
                                        sails.log.info("isTokenAuthorized POLICY: User's token is authorized!");
                                        return next();
                                    })
                                    .catch(function(err){
                                        sails.log.info("isTokenAuthorized: Can't update user with the new token!");
                                        return res.negotiate(err);
                                    });
                            }
                            else {
                                res.set('X-Auth-Token',header_token);
                                sails.log.info("isTokenAuthorized POLICY: User's token is authorized!");
                                return next();
                            }

                        })
                        .catch(function(err){
                            sails.log.info("isTokenAuthorized: Error while searching for a user with the specific token-userid");
                            return res.negotiate(err)
                        });


                } //else (token is valid)
        }); //verify token

        }

    }
};
