import { Request, Response } from "express";
import { prisma } from "../../index";
import { GeoCode } from "../@types/GeoCode";

export const createGeoCode = async (req: Request, res: Response) => {
  const { latitude, longitude, campusName, camId }: GeoCode = req.body;
  const newGeoCode = await prisma.geoCodes.create({
    data: {
      latitude: latitude,
      longitude: longitude,
      campusName: campusName,
      camId: camId,
    },
  });
  res.status(201).json(newGeoCode);
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
