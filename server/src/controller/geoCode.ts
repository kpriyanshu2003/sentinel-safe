import { Request, Response } from "express";
import { prisma } from "../../index";
import { GeoCode } from "../@types/GeoCode";
import { ServerResponse } from "../@types/ServerResponse";

export const createGeoCode = async (req: Request, res: Response) => {
  const { latitude, longitude, campusName, camId }: GeoCode = req.body;
  try {
    if (!latitude || !longitude || !campusName || !camId)
      return res
        .status(400)
        .json({ message: "Invalid input" } as ServerResponse);
    const newGeoCode = await prisma.geoCodes.create({
      data: {
        latitude: latitude,
        longitude: longitude,
        campusName: campusName,
        camId: camId,
      },
    });
    if (!newGeoCode) return res.status(404).json({ message: "Data not found" });
    res.status(201).json(newGeoCode);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGeoCode = async (req: Request, res: Response) => {
  const geoCodes = await prisma.geoCodes.findMany({});
  res.status(200).json(geoCodes);
};

export const getGeoCodeByCampus = async (req: Request, res: Response) => {
  const geoCodes = await prisma.geoCodes.findFirst({
    where: {
      campusName: req.params.id,
    },
  });
  res.status(200).json(geoCodes);
};

export const getGeoCodeByCamera = async (req: Request, res: Response) => {
  const geoCodes = await prisma.geoCodes.findFirst({
    where: { camId: req.params.id },
  });
  res.status(200).json(geoCodes);
};

export const updateGeoCode = async (req: Request, res: Response) => {
  const { latitude, longitude, campusName, camId }: GeoCode = req.body;
  const updatedGeoCode = await prisma.geoCodes.update({
    where: { campusName_camId: { campusName: campusName, camId: camId } },
    data: { latitude: latitude, longitude: longitude },
  });
  res.status(200).json(updatedGeoCode);
};

export const deleteGeoCode = async (req: Request, res: Response) => {
  const { campusName, camId }: GeoCode = req.body;
  const deletedGeoCode = await prisma.geoCodes.delete({
    where: { campusName_camId: { campusName: campusName, camId: camId } },
  });
  res.status(200).json(deletedGeoCode);
};
