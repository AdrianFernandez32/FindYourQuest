import { Request, Response } from "express";
import { ILogin } from "../interfaces/login.interface.js";
import { connect } from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function authentication(req: Request, res: Response) {
  try {
    const newLogin: ILogin = req.body;
    const conn = await connect();

    const query = `SELECT id, password FROM User WHERE email = ?`;
    const [users]: any[] = await conn.query(query, [newLogin.email]);
    const user = users[0];

    if (user) {
      const validPassword = await bcrypt.compare(
        newLogin.password,
        user.password
      );

      if (validPassword) {
        jwt.sign({ user }, "secretkey", (err: any, token: any) => {
          res.json({
            token,
          });
        });
      } else {
        res.status(401).json({
          message: "Incorrect password",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred.",
      error: error.message,
    });
  }
}
