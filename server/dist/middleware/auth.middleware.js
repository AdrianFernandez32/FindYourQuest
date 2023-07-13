import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
        console.log(authHeader);
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export default verifyToken;
//# sourceMappingURL=auth.middleware.js.map