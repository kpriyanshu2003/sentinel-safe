import { Request, Response } from "express";
import { prisma } from "../../index";

export async function getUser(req: Request, res: Response) {
  const user = await prisma.user.findMany({});
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.json(user);
}

export async function updateUser(req: Request, res: Response) {
  const { email, name } = req.body;
  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: name,
      updatedAt: new Date(),
    },
  });
  res.send(updateUser);
}

export async function deleteUser(req: Request, res: Response) {
  const deleteUser = await prisma.user.delete({
    where: {
      email: req.params.id,
    },
  });
  res.send(deleteUser);
}
