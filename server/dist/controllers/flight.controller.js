import { connect } from "../database.js";
export async function getFlights(req, res) {
    const pool = await connect();
    const conn = await pool.getConnection();
    const flights = await conn.query("SELECT * FROM Flight");
    return res.json(flights[0]);
}
export async function createFlight(req, res) {
    try {
        const newFlight = req.body;
        const pool = await connect();
        const conn = await pool.getConnection();
        const insertQuery = "INSERT INTO Flight SET ?";
        const [response] = await conn.query(insertQuery, newFlight);
        const insertId = response.insertId;
        const selectQuery = "SELECT * FROM Flight WHERE id = ?";
        const [flight] = await conn.query(selectQuery, insertId);
        return res.json({
            flight: flight[0],
            message: "Flight Created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error ocurred while creating the Flight.",
            error: error.message,
        });
    }
}
export async function getFlight(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    const flight = await conn.query(`SELECT * FROM Flight WHERE id = ${id}`);
    return res.json(flight[0]);
}
export async function deleteFlight(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const flight = await conn.query(`DELETE FROM Flight WHERE id = ${id}`);
        return res.json({
            message: "Flight deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting flight",
            error: error.message,
        });
    }
}
export async function updateFlight(req, res) {
    const id = req.params.postId;
    const updatedFlight = req.body;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const user = await conn.query(`UPDATE Flight SET departure='${updatedFlight.departure}', landing='${updatedFlight.landing}', airline='${updatedFlight.airline}', departure_airport='${updatedFlight.departure_airport}', landing_airport='${updatedFlight.landing_airport}' WHERE id=${id}`);
        return res.json({
            message: "Flight Updated",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting flight",
            error: error.message,
        });
    }
}
//# sourceMappingURL=flight.controller.js.map