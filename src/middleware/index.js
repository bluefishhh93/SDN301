export const isAdmin = (req, res, next) => {
    const { admin } = req.user; // Assuming you're using the `isAdmin` field
    console.log(req.user, 'reqqqq');
    if (admin) {
      next(); // User is an admin, proceed to the next middleware
    } else {
      res.status(403).json({ message: "Forbidden: You are not an admin" });
    }
  };