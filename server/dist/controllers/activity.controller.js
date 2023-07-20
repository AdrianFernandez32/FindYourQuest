import { connect } from "../database.js";
export async function getActivities(req, res) {
    const conn = await connect();
    const activities = await conn.query("SELECT * FROM Activity");
    return res.json(activities[0]);
}
export async function createActivity(req, res) {
    try {
        const newActivity = req.body;
        const conn = await connect();
        const insertQuery = "INSERT INTO Activity SET ?";
        await conn.query(insertQuery, newActivity);
        return res.json({
            message: "Activity Created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while creating the Activity.",
            error: error.message,
        });
    }
}
export async function getActivity(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    const activity = await conn.query(`SELECT * FROM Activity WHERE id = ?`, [
        id,
    ]);
    return res.json(activity[0]);
}
export async function deleteActivity(req, res) {
    const id = req.params.postId;
    const conn = await connect();
    try {
        await conn.query(`DELETE FROM Activity WHERE id = ?`, [id]);
        return res.json({
            message: "Activity deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting activity",
            error: error.message,
        });
    }
}
export async function updateActivity(req, res) {
    const id = req.params.postId;
    const updatedActivity = req.body;
    const conn = await connect();
    try {
        const activity = await conn.query(`UPDATE Activity SET name=?, place_id=?, start=?, end=?, itinerary_id=? WHERE id=?`, [
            updatedActivity.name,
            updatedActivity.place_id,
            updatedActivity.start,
            updatedActivity.end,
            updatedActivity.itinerary_id,
            id,
        ]);
        return res.json({
            message: "Activity Updated",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error updating activity",
            error: error.message,
        });
    }
}
//# sourceMappingURL=activity.controller.js.map