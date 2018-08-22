var config = require('./config');

var adminCheck = (req, res, next) => {
    var roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
}
module.exports = adminCheck;