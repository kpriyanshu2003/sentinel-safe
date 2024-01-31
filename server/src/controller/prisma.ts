import { Request, Response } from "express";
import { prisma } from "../../index";

export async function get(req: Request, res: Response) {
  const user = await prisma.user.findMany({});
  res.json(user);
}
