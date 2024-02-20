import { Request, Response } from "express";
import { prisma } from "../..";
import { geoCodeData } from "../data/geoCode";
import { CustomResponse } from "../@types/CustomResponse";

export const initGeoCode = async (req: Request, res: Response) => {
  try {
    await prisma.geoCodes.deleteMany();
    const geoCodes = await prisma.geoCodes.createMany({
      data: geoCodeData,
    });
    if (!geoCodes)
      return res.status(500).send(new CustomResponse("Error adding Geo Codes"));
    res
      .status(200)
      .send(new CustomResponse("Geo Codes added successfully", geoCodes));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};
