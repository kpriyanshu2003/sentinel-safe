import { prisma } from "../../index";
import { CustomResponse } from "../@types/CustomResponse";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany({});
    if (!user)
      return res.status(404).send(new CustomResponse("User not found"));
    res.status(200).send(new CustomResponse("User found", user));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    if (!req.body.email || !req.body.name)
      return res
        .status(400)
        .send(new CustomResponse("Email and Name are required"));
    const user = await prisma.user.create({
      data: req.body,
    });
    if (!user)
      return res.status(400).send(new CustomResponse("User not created"));
    res.status(201).send(new CustomResponse("User created", user));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    if (!email || !name)
      return res
        .status(400)
        .send(new CustomResponse("Email and Name are required"));
    const updateUser = await prisma.user.update({
      where: { email: email },
      data: { name: name, updatedAt: new Date() },
    });
    if (!updateUser)
      return res.status(404).send(new CustomResponse("User not found"));
    res.status(200).send(new CustomResponse("User updated", updateUser));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    if (!req.params.id)
      return res.status(400).send(new CustomResponse("Email is required"));
    const deleteUser = await prisma.user.delete({
      where: { email: req.params.id },
    });
    if (!deleteUser)
      return res.status(404).send(new CustomResponse("User not found"));
    res.status(200).send(new CustomResponse("User deleted", deleteUser));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}
