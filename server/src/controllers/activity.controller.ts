import { Request, Response } from "express";
import { connect } from "../database.js";
import { IActivity } from "../interfaces/activity.interface.js";

export async function getActivities(
  req: Request,
  res: Response
): Promise<Response> {
  const pool = await connect();
  const conn = await pool.getConnection();
  try {
    const activities = await conn.query("SELECT * FROM Activity");
    return res.json(activities[0]);
  } finally {
    conn.release();
  }
}

export async function createActivities(
  req: Request,
  res: Response
): Promise<Response> {
  const pool = await connect();
  const conn = await pool.getConnection();

  try {
    const newActivities: IActivity[] = req.body;

    await conn.beginTransaction();

    for (const activity of newActivities) {
      const insertQuery = "INSERT INTO Activity SET ?";
      await conn.query(insertQuery, activity);
    }

    await conn.commit();

    return res.json({
      message: "Activities Created",
    });
  } catch (error) {
    await conn.rollback();

    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the Activities.",
      error: error.message,
    });
  } finally {
    conn.release();
  }
}

export async function getActivity(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.postId;
  const pool = await connect();
  const conn = await pool.getConnection();
  try {
    const activity = await conn.query(`SELECT * FROM Activity WHERE id = ?`, [
      id,
    ]);
    return res.json(activity[0]);
  } finally {
    conn.release();
  }
}

export async function deleteActivity(req: Request, res: Response) {
  const id = req.params.postId;
  const pool = await connect();
  const conn = await pool.getConnection();
  try {
    await conn.query(`DELETE FROM Activity WHERE id = ?`, [id]);
    return res.json({
      message: "Activity deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  } finally {
    conn.release();
  }
}

export async function updateActivity(req: Request, res: Response) {
  const id = req.params.postId;
  const updatedActivity: IActivity = req.body;
  const pool = await connect();
  const conn = await pool.getConnection();
  try {
    const activity = await conn.query(
      `UPDATE Activity SET name=?, place_id=?, start=?, end=?, itinerary_id=? WHERE id=?`,
      [
        updatedActivity.name,
        updatedActivity.place_id,
        updatedActivity.start,
        updatedActivity.end,
        updatedActivity.itinerary_id,
        id,
      ]
    );
    return res.json({
      message: "Activity Updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error updating activity",
      error: error.message,
    });
  } finally {
    conn.release();
  }
}
