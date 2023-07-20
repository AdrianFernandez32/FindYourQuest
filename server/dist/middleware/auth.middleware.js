import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ message: "Token error" });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token malformatted" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Expired token" });
        }
        else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
export default verifyToken;
//# sourceMappingURL=auth.middleware.js.map