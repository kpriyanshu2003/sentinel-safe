import { prisma } from "../../index";
import { GeoCode } from "../@types/GeoCode";
import { Request, Response } from "express";
import { CustomResponse } from "../@types/CustomResponse";

export const createGeoCode = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, campusName, camId }: GeoCode = req.body;
    if (!latitude || !longitude || !campusName || !camId)
      return res
        .status(400)
        .send(
          new CustomResponse(
            "Field Required: latitude, longitude, campusName, camId"
          )
        );
    const newGeoCode = await prisma.geoCodes.create({
      data: {
        latitude: latitude,
        longitude: longitude,
        campusName: campusName,
        camId: camId,
      },
    });
    if (!newGeoCode)
      return res.status(404).send(new CustomResponse("Not Found"));
    res.status(201).send(new CustomResponse("GeoCode created", newGeoCode));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};

export const getGeoCode = async (req: Request, res: Response) => {
  try {
    const geoCodes = await prisma.geoCodes.findMany({});
    if (!geoCodes) return res.status(404).send(new CustomResponse("Not Found"));
    res.status(200).send(new CustomResponse("GeoCode found", geoCodes));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};

export const getGeoCodeByCampus = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .send(new CustomResponse("Campus Name is required"));
    const geoCodes = await prisma.geoCodes.findFirst({
      where: { campusName: req.params.id },
    });
    if (!geoCodes) return res.status(404).send(new CustomResponse("Not Found"));
    res.status(200).send(new CustomResponse("GeoCode found", geoCodes));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};

export const getGeoCodeByCamera = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res.status(400).send(new CustomResponse("Camera ID is required"));
    const geoCodes = await prisma.geoCodes.findFirst({
      where: { camId: req.params.id },
    });
    if (!geoCodes) return res.status(404).send(new CustomResponse("Not Found"));
    res.status(200).send(new CustomResponse("GeoCode found", geoCodes));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};

export const updateGeoCode = async (req: Request, res: Response) => {
  try {
    if (
      !req.body.latitude ||
      !req.body.longitude ||
      !req.body.campusName ||
      !req.body.camId
    )
      return res
        .status(400)
        .send(
          new CustomResponse(
            "Field Required: latitude, longitude, campusName, camId"
          )
        );
    const { latitude, longitude, campusName, camId }: GeoCode = req.body;
    const updatedGeoCode = await prisma.geoCodes.update({
      where: { campusName_camId: { campusName: campusName, camId: camId } },
      data: { latitude: latitude, longitude: longitude },
    });
    if (!updatedGeoCode)
      return res.status(404).send(new CustomResponse("Not Found"));
    res.status(200).send(new CustomResponse("GeoCode updated", updatedGeoCode));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};

export const deleteGeoCode = async (req: Request, res: Response) => {
  try {
    if (!req.body.campusName || !req.body.camId)
      return res
        .status(400)
        .send(new CustomResponse("Field Required: campusName, camId"));
    const { campusName, camId }: GeoCode = req.body;
    const deletedGeoCode = await prisma.geoCodes.delete({
      where: { campusName_camId: { campusName: campusName, camId: camId } },
    });
    if (!deletedGeoCode)
      return res.status(404).send(new CustomResponse("Not Found"));
    res.status(200).send(new CustomResponse("GeoCode deleted", deletedGeoCode));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
};
