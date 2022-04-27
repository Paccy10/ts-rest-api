import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";
const { pool } = require('../db');

interface Post {
	userId: Number;
	id: Number;
	title: String;
	body: String;
}

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
	let result = await pool.query("SELECT * FROM user_account");

	return res.status(200).json({ result: result.rows });
}

export default { getPosts };