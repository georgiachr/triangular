/**
 * Created by georgia.chr on 21-Sep-15.
 * Verifies that user's role is 'Administrator'. isTokenAuthorized is a prereq. for this policy.
 * Request has the user object and this module uses request's user role to identify the user's role
 * (from database record)
 *
 * @module isUserAdmin
 * @version 1.0.0
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {

  var roleToVerify = 'Administrator';
  var currentUser = req.options.policyparams.currentuser || {};
  var userRole;

  if(undefined !== currentUser)
    userRole = currentUser.role || 'undefined';
  else
    return res.serverError();


  if ( userRole != roleToVerify)
  {
    sails.log.info("isUserAdmin policy: The user is not Administrator "+userRole);

    //if policy failed then stop the queue of policies
    return res.forbidden();
  };

  //if user's role matches roleToVerify
  return next();

};
