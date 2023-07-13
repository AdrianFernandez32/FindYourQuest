import { connect } from "../database.js";
export async function getUsers(req, res) {
    const conn = await connect();
    const users = await conn.query("SELECT * from User");
    return res.json(users[0]);
}
export async function createUser(req, res) {
    try {
        const newUser = req.body;
        const conn = await connect();
        const query = "INSERT INTO User SET ?";
        await conn.query(query, newUser);
        return res.json({
            message: "Post Created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the post.",
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
    const user = await conn.query(`DELETE FROM User WHERE id = ${id}`);
    return res.json({
        message: "Post deleted",
    });
}
export async function updateUser(req, res) {
    const id = req.params.postId;
    const updatePost = req.body;
    const conn = await connect();
    const user = await conn.query(`UPDATE User SET first_name='${updatePost.first_name}', last_name='${updatePost.last_name}', password='${updatePost.password}' WHERE id = ${id}`);
    return res.json({
        message: "Post updated",
    });
}
//# sourceMappingURL=user.controller.js.map