import { Request, Response } from "express";
import { ILogin } from "../interfaces/login.interface.js";
import { connect } from "../database.js";
import jwt from "jsonwebtoken";

export async function authentication(req: Request, res: Response) {
  const newLogin: ILogin = req.body;
  const conn = await connect();
  const query = `SELECT id FROM User WHERE '${newLogin.email}' = email AND '${newLogin.password}' = password`;
  const user: any = await conn.query(query);
  if (user[0].length === 1) {
    jwt.sign({ user }, "secretkey", (err: any, token: any) => {
      res.json({
        token,
      });
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
}
