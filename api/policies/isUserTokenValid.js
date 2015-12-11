/**
 * Created by georgia.chr on 11-Dec-15.
 */

/**
 * Supposed that token is authorized (isTokenAuthorized).
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

    console.log("isUserTokenValid POLICY!");

    var header_token;
    var useridFromHeader;
    var decoded;

    if (req.headers) {

        if (req.headers["x-auth-token"] === undefined) {
            return res.json(401, {err: 'isUserTokenValid: No Authorization header was found'});
        }
        else {
            //taken from isTokenAuthorized
            header_token = req.headers["x-auth-token"];

            decoded = jwtToken.decodeToken(header_token, {complete: true});

            useridFromHeader = decoded.payload.userid;

            User.findOne({
                id: useridFromHeader
            }, function foundUser(err, user) {

                if (err) {
                    console.log("isUserTokenValid: Found user error!");
                    return res.negotiate(err);
                }

                if (!user) {
                    console.log("isUserTokenValid: No user found!");
                    return res.notFound();
                }
                else {
                    if (user.token != header_token) {
                        console.log("isUserTokenValid: User's token is not valid or it has expired!");
                        return res.json(401, {err: 'isUserTokenValid: The token is not valid'});
                    }
                    else
                        next();
                }

            });

        }

    } // if (req.headers)

};
