//TODO: change title to role
/**
 * Created by georgia.chr on 21-Sep-15.
 *
 * @module isAdmin
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function (req, res, next) {

  var userRole = (req.param('requestedUserRole'));

  if ( userRole != 'Administrator')
  {
    console.log("isAdmin policy: negotiate error");

    return res.forbidden();
  };

  next();

};
