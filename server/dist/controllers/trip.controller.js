import { connect } from "../database.js";
export async function getTrips(req, res) {
    const pool = await connect();
    const conn = await pool.getConnection();
    const trips = await conn.query("SELECT * FROM Trip");
    return res.json(trips[0]);
}
export async function createTrip(req, res) {
    try {
        const pool = await connect();
        const conn = await pool.getConnection();
        const newTrip = req.body;
        const insertQuery = "INSERT INTO Trip SET ?";
        const [response] = await conn.query(insertQuery, newTrip);
        const insertId = response.insertId;
        const selectQuery = "SELECT * FROM Trip WHERE id = ?";
        const [trip] = await conn.query(selectQuery, insertId);
        return res.json({
            trip: trip[0],
            message: "Trip created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error ocurred while creating the trip",
            error: error.message,
        });
    }
}
export async function getTrip(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const trip = await conn.query(`SELECT * FROM Trip WHERE id = ${id}`);
        return res.json(trip[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error getting the trip",
            error: error.message,
        });
    }
}
export async function deleteTrip(req, res) {
    const id = req.params.postId;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const trip = await conn.query(`DELETE FROM Trip WHERE id = ${id}`);
        return res.json({
            message: "Trip deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting trip",
            error: error.message,
        });
    }
}
export async function updateTrip(req, res) {
    const id = req.params.postId;
    const updatedTrip = req.body;
    const pool = await connect();
    const conn = await pool.getConnection();
    try {
        const user = await conn.query(`UPDATE Trip SET start_date='${updatedTrip.start_date}', end_date='${updatedTrip.end_date}', city_name='${updatedTrip.city_id}', flight_in_id=${updatedTrip.flight_in_id}, flight_out_id=${updatedTrip.flight_out_id}, hotel_id=${updatedTrip.hotel_id}`);
        return res.json({
            message: "Trip Updated",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting trip",
            error: error.message,
        });
    }
}
//# sourceMappingURL=trip.controller.js.map