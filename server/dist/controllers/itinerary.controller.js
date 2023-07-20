import { connect } from "../database.js";
export async function getItineraries(req, res) {
    const conn = await connect();
    const itinerary = await conn.query("SELECT * FROM Itinerary");
    return res.json(itinerary[0]);
}
export async function createItinerary(req, res) {
    try {
        const newItinerary = req.body;
        const conn = await connect();
        const insertQuery = "INSERT INTO Itinerary SET ?";
        await conn.query(insertQuery, newItinerary);
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
export async function deleteItinerary(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    try {
        const itinerary = await conn.query(`DELETE FROM Itinerary WHERE id = ${id}`);
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
export async function updateItinerary(req, res) {
    const id = req.params.postId;
    const updatedItinerary = req.body;
    const conn = await connect();
    try {
        const itinerary = await conn.query(`UPDATE Itinerary SET active=${updatedItinerary.active} WHERE id=${id}`);
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