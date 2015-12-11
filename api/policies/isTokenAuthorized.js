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
 * It does not checks user's stored token with this token.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function (req, res, next) {

console.log("isTokenAuthorized POLICY!");

    var header_token;
    var userid;
    var decoded;

    if (req.headers) {

        // if no token header exists then user is not authorized!
        if (req.headers["x-auth-token"] === undefined) {
            console.log("isTokenAuthorized: Token undefined");
            return res.json(401, {err: 'isTokenAuthorized: No Authorization header was found'});
        }
        else {
            header_token = req.headers["x-auth-token"];
            console.log('isTokenAuthorized: header_token = ' + header_token);

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
                    console.log('isTokenAuthorized: token was successfully verified! ');

                    decoded = jwtToken.decodeToken(header_token, {complete: true});

                    //console.log(JSON.stringify(decoded));

                    userid = decoded.payload.userid;

                    //Find user having userid
                    User.findOne({
                        id: userid
                    }, function foundUser(err, user) {

                        if (err) {
                            console.log("isTokenAuthorized: Error while searching for a user with the specific token-userid");
                            return res.negotiate(err)
                        }

                        if (!user) {
                            console.log("isTokenAuthorized: User with the specific token-userid not found");
                            return res.notFound();
                        }
                        else //if user found then set Response Header with the specific token
                        {
                            //check if their token is near expiration
                            if (jwtToken.tokenExpiresInMinutes(header_token) < sails.config.globals.tokenNearTimeExpirationInMinutes) {

                                console.log('near expiration');

                                var newtoken = jwtToken.issueToken(decoded.payload);

                                //update user's new token in db
                                User.update(user.id, {token: newtoken},
                                    function (err, updated) {
                                        if (err) {
                                            console.log("isTokenAuthorized: Can't update user with the new token!");
                                            return res.negotiate(err);
                                        }
                                        else {
                                            // All done- let the client know the new token.
                                            res.set('X-Auth-Token',newtoken);
                                            next();
                                        }
                                    }); //update
                            }
                            else {
                                res.set('X-Auth-Token',header_token);
                                next();
                            }

                        }
                    }); //findone

                } //else (token is valid)
            }); //verify token

        }

    }
};
