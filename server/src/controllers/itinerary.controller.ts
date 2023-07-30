import { Request, Response } from "express";
import { connect } from "../database.js";
import { IItinerary } from "../interfaces/itinerary.interface.js";
import { OkPacket } from "mysql2";

export async function getItineraries(
  req: Request,
  res: Response
): Promise<Response> {
  const pool = await connect();
  const conn = await pool.getConnection();
  const itinerary = await conn.query("SELECT * FROM Itinerary");
  return res.json(itinerary[0]);
}

export async function createItinerary(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const newItinerary: IItinerary = req.body;
    const pool = await connect();
    const conn = await pool.getConnection();

    const insertQuery = "INSERT INTO Itinerary SET ?";
    const [response] = await conn.query(insertQuery, newItinerary);
    const insertId = (response as OkPacket).insertId;

    const selectQuery = "SELECT * FROM Itinerary WHERE id = ?";
    const [itinerary] = await conn.query(selectQuery, insertId);
    return res.json({
      itinerary: itinerary[0],
      message: "Itinerary created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occured while creating the Itinerary.",
      error: error.message,
    });
  }
}

export async function getItinerary(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const itinerary = await conn.query(
    `SELECT * FROM Itinerary WHERE id = ${id}`
  );
  return res.json(itinerary[0]);
}

export async function getItineraryByUser(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = req.params.userId;
  const conn = await connect();
  const itinerary = await conn.query(
    `SELECT 
      I.id as itinerary_id, I.trip_id, I.user_id, I.active,
      T.id as trip_id, T.start_date, T.end_date, T.city_id
   FROM Itinerary I 
   LEFT JOIN Trip T ON I.trip_id = T.id 
   WHERE I.user_id = ${userId}`
  );
  return res.json(itinerary[0]);
}

export async function deleteItinerary(req: Request, res: Response) {
  const id = req.params.postId;
  const conn = await connect();
  try {
    const itinerary = await conn.query(
      `DELETE FROM Itinerary WHERE id = ${id}`
    );
    return res.json({
      message: "Itinerary deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting Itinerary",
      error: error.message,
    });
  }
}

export async function updateItinerary(req: Request, res: Response) {
  const id = req.params.postId;
  const updatedItinerary: IItinerary = req.body;
  const conn = await connect();
  try {
    const itinerary = await conn.query(
      `UPDATE Itinerary SET active=${updatedItinerary.active} WHERE id=${id}`
    );
    return res.json({
      message: "Flight Updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting flight",
      error: error.message,
    });
  }
}
