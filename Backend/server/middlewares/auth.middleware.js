import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1. Check for Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // 4. Attach decoded user info to request
      console.log("Decoded JWT:", decoded); 
      req.user = decoded; // e.g., { id, email }
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(500).json({ message: "Server error in authentication" });
  }
};

export default authMiddleware;
