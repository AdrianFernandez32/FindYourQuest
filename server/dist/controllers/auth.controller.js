import { connect } from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export async function authentication(req, res) {
    try {
        const newLogin = req.body;
        const pool = await connect();
        const conn = await pool.getConnection();
        const query = `SELECT id, password, email, first_name, last_name, trips FROM User WHERE email = ?`;
        const [users] = await conn.query(query, [newLogin.email]);
        const user = users[0];
        if (user) {
            const validPassword = await bcrypt.compare(newLogin.password, user.password);
            if (validPassword) {
                delete user.password;
                jwt.sign(user, "secretkey", (err, token) => {
                    res.json({
                        token,
                    });
                });
            }
            else {
                res.status(401).json({
                    message: "Incorrect password",
                });
            }
        }
        else {
            res.status(404).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred.",
            error: error.message,
        });
    }
}
export async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided.",
            });
        }
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: "Unauthorized!",
                    error: err,
                });
            }
            next();
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred.",
            error: error.message,
        });
    }
}
export async function verifyTokenLog(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided.",
            });
        }
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: "Unauthorized!",
                    error: err,
                });
            }
            res.status(200).json({ message: "Token is valid", user: decoded });
            next();
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred.",
            error: error.message,
        });
    }
}
//# sourceMappingURL=auth.controller.js.map