import { connect } from "../database.js";
export async function getHotels(req, res) {
    const pool = await connect();
    const conn = await pool.getConnection();
    const flight = await conn.query("SELECT * FROM Hotel");
    return res.json(flight[0]);
}
export async function createHotel(req, res) {
    try {
        const newHotel = req.body;
        const pool = await connect();
        const conn = await pool.getConnection();
        const insertQuery = "INSERT INTO Hotel SET ?";
        const [response] = await conn.query(insertQuery, newHotel);
        const insertId = response.insertId;
        // Obtener el objeto recién insertado
        const selectQuery = "SELECT * FROM Hotel WHERE id = ?";
        const [hotel] = await conn.query(selectQuery, insertId);
        return res.json({
            hotel: hotel[0],
            message: "Hotel Created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error ocurred while creating the Hotel",
            error: error.message,
        });
    }
}
export async function getHotel(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const hotel = await conn.query(`SELECT * FROM Hotel WHERE id=${id}`);
        return res.json(hotel[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}
export async function updateHotel(req, res) {
    const id = req.params.postId;
    const updatedHotel = req.body;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const user = await conn.query(`UPDATE Hotel SET checkin='${updatedHotel.checkin}', checkout='${updatedHotel.checkout}', place_id='${updatedHotel.place_id}' WHERE id = ${id}`);
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
export async function deleteHotel(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const hotel = await conn.query(`DELETE FROM Hotel WHERE id=${id}`);
        return res.json({
            message: "Hotel deleted",
        });
    }
    catch (error) {
        console.error(error);
        console.error(error);
        return res.status(500).json({
            message: "Error deleting the hotel",
            error: error.message,
        });
    }
}
//# sourceMappingURL=hotel.controller.js.map