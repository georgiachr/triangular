/**
 * Created by georgia.chr on 14-Sep-15.
 *
 * First, we check request headers - looking for a header called 'X-Auth-Token', which contains a Bearer token_string.
 *
 * If header exists and token is valid then we extract its payload (we need it to find user's token which is stored in the db).
 *
 * Then, set response's header as [x-auth-Token] and assign the valid token
 *
 *
 * ----------------------------------------------------------------------
 * If there is no header, we also check if we have it on the query string like: /api/foo?token=token_string.
 * When we finally have the token, we just verify it, extract its payload and assign it to req.token so we can access it from a controller.
 *
 * If there is no token, we just send an error json.
 */



/**
 * This policy verifies that the token from request header 'X-Auth-Token' is verified as a structure.
 * Also checks user's stored token with this token (tokens match).
 * @param req
 * @param res
 * @param next
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
            //sails.log.info('isTokenAuthorized: header_token = ' + header_token);

            // if token exists - check token is valid
            // jwtToken.verifyToken is an Asynchronous function.
            // Callback passed the payload decoded if the signature (and optionally expiration, audience, issuer)
            // it has nothing to do with user's stored token
            jwtToken.verifyToken(header_token, function (err, token) {

            //not a valid token
            if (err) {
                return res.json(401, {err: 'isTokenAuthorized: The token is not valid'});
            }
            else { // valid token - get userid from it

                decoded = jwtToken.decodeToken(header_token, {complete: true});

                //sails.log.info(JSON.stringify(decoded));

                userid = decoded.payload.userid;

                //Find user having userid
                //Use WATERLINE's predefined query method with PROMISES
                User.find()
                    .where({ id: userid })
                    .then(function(users){
                        var founduser = users[0];

                        // return error if user not found
                        if (!founduser) {
                            console.log("isUserTokenAuthorized POLICY: No user found!");
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
