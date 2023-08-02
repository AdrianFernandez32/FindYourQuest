import { connect } from "../database.js";
import bcrypt from "bcrypt";
export async function getUsers(req, res) {
    const conn = await connect();
    const users = await conn.query("SELECT * from User");
    return res.json(users[0]);
}
export async function createUser(req, res) {
    try {
        const newUser = req.body;
        const pool = await connect();
        const conn = await pool.getConnection();
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        const checkEmailQuery = "SELECT * FROM User WHERE email = ?";
        const [existingUser] = await conn.query(checkEmailQuery, [
            newUser.email,
        ]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "The email is already in use.",
            });
        }
        const insertQuery = "INSERT INTO User SET ?";
        await conn.query(insertQuery, newUser);
        return res.json({
            message: "User Created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the User.",
            error: error.message,
        });
    }
}
export async function getUser(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    const user = await conn.query(`SELECT * FROM User WHERE id = ${id}`);
    return res.json(user[0]);
}
export async function deleteUser(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    try {
        const user = await conn.query(`DELETE FROM User WHERE id = ${id}`);
        return res.json({
            message: "User deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}
export async function updateUser(req, res) {
    const id = req.params.postId;
    const updatedUser = req.body;
    const conn = await connect();
    try {
        const user = await conn.query(`UPDATE User SET first_name='${updatedUser.first_name}', last_name='${updatedUser.last_name}', password='${updatedUser.password}' WHERE id = ${id}`);
        return res.json({
            message: "User updated",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}
//# sourceMappingURL=user.controller.js.map