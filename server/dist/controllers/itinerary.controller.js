import { connect } from "../database.js";
export async function getItineraries(req, res) {
    const conn = await connect();
    const itinerary = await conn.query("SELECT * FROM Itinerary");
    return res.json(itinerary[0]);
}
export async function createItinerary(req, res) {
    try {
        const newTrip = req.body;
        const conn = await connect();
        const insertQuery = "INSERT INTO Itinerary SET ?";
        await conn.query(insertQuery, newTrip);
        return res.json({
            message: "Itinerary created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occured while creating the Itinerary.",
            error: error.message,
        });
    }
}
export async function getItinerary(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    const itinerary = await conn.query(`SELECT * FROM Itinerary WHERE id = ${id}`);
    return res.json(itinerary[0]);
}
export async function deleteTrip(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    try {
        const trip = await conn.query(`DELETE FROM Itinerary WHERE id = ${id}`);
        return res.json({
            message: "Itinerary deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting Itinerary",
            error: error.message,
        });
    }
}
export async function updateTrip(req, res) {
    const id = req.params.postId;
    const updatedTrip = req.body;
    const conn = await connect();
    try {
        const trip = await conn.query(`UPDATE Trip SET active=${updatedTrip.active}`);
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
//# sourceMappingURL=itinerary.controller.js.map