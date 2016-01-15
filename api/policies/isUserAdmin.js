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
