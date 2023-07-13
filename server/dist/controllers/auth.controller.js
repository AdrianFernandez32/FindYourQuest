import { connect } from "../database.js";
import jwt from "jsonwebtoken";
export async function authentication(req, res) {
    const newLogin = req.body;
    const conn = await connect();
    const query = `SELECT id FROM User WHERE '${newLogin.email}' = email AND '${newLogin.password}' = password`;
    const user = await conn.query(query);
    if (user[0].length === 1) {
        jwt.sign({ user }, "secretkey", (err, token) => {
            res.json({
                token,
            });
        });
    }
    else {
        res.status(404).json({
            message: "User not found",
        });
    }
}
//# sourceMappingURL=auth.controller.js.map