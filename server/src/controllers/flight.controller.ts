import { Request, Response } from "express";
import { connect } from "../database.js";
import { IFlight } from "../interfaces/flight.interface.js";

export async function getFlights(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  const flights = await conn.query("SELECT * FROM Flight");
  return res.json(flights[0]);
}

export async function createFlight(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const newFlight: IFlight = req.body;
    const conn = await connect();

    const insertQuery = "INSERT INTO Flight SET ?";
    await conn.query(insertQuery, newFlight);
    return res.json({
      message: "Flight Created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error ocurred while creating the Flight.",
      error: error.message,
    });
  }
}

export async function getFlight(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.postId;
  const conn = await connect();
  const flight = await conn.query(`SELECT * FROM Flight WHERE id = ${id}`);
  return res.json(flight[0]);
}

export async function deleteFlight(req: Request, res: Response) {
  const id = req.params.postId;
  const conn = await connect();
  try {
    const flight = await conn.query(`DELETE FROM Flight WHERE id = ${id}`);
    return res.json({
      message: "Flight deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error deleting flight",
      error: error.message,
    });
  }
}

export async function updateFlight(req: Request, res: Response) {
  const id = req.params.postId;
  const updatedFlight: IFlight = req.body;
  const conn = await connect();
  try {
    const user = await conn.query(
      `UPDATE User SET departure='${updatedFlight.departure}', landing='${updatedFlight.landing}', airline='${updatedFlight.airline}', departure_airport='${updatedFlight.departure_airport}', landing_airport='${updatedFlight.landing_airport}' WHERE id=${id}`
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
