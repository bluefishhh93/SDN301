// Auth middleware function
function auth(req, res, next) {
    console.log(process.env.ADMIN_PASS); // Log admin password for debugging
  
    if (!req.signedCookies.user) {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        const err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
  
      const [type, credentials] = authHeader.split(' ');
  
      if (type !== 'Basic' || !credentials) {
        const err = new Error('Invalid authentication format!');
        err.status = 400;
        return next(err);
      }
  
      const [user, pass] = Buffer.from(credentials, 'base64').toString().split(':');
  
      if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        res.cookie('user', 'admin', { signed: true, httpOnly: true, secure: true });
        req.session.user = 'admin'; // Set session user as 'admin'
        return next(); // Authorized
      } else {
        const err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }
    } else if (req.signedCookies.user === 'admin' || req.session.user === 'admin') {
      return next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
  }

export default auth;    
