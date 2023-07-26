import { Request, Response } from "express";
import { connect } from "../database.js";
import { IHotel } from "../interfaces/hotel.interface.js";

export async function getHotels(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  const flight = await conn.query("SELECT * FROM Hotel");
  return res.json(flight[0]);
}

export async function createHotel(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const newHotel: IHotel = req.body;
    const conn = await connect();

    const insertQuery = "INSERT INTO Hotel SET ?";
    await conn.query(insertQuery, newHotel);
    return res.json({
      message: "Flight Created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error ocurred while creating the Hotel",
      error: error.message,
    });
  }
}

export async function getHotel(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  try {
    const hotel = await conn.query(`SELECT * FROM Hotel WHERE id=${id}`);
    return res.json(hotel[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function updateHotel(req: Request, res: Response) {
  const id = req.params.postId;
  const updatedHotel: IHotel = req.body;
  const conn = await connect();
  try {
    const user = await conn.query(
      `UPDATE Hotel SET checkin='${updatedHotel.checkin}', checkout='${updatedHotel.checkout}', place_id='${updatedHotel.place_id}' WHERE id = ${id}`
    );
    return res.json({
      message: "User updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function deleteHotel(req: Request, res: Response) {
  const id = req.params.postId;
  const conn = await connect();
  try {
    const hotel = await conn.query(`DELETE FROM Hotel WHERE id=${id}`);
    return res.json({
      message: "Hotel deleted",
    });
  } catch (error) {
    console.error(error);
    console.error(error);
    return res.status(500).json({
      message: "Error deleting the hotel",
      error: error.message,
    });
  }
}