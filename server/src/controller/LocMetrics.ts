import { prisma } from "../../index";
import { getRisk } from "../utils/risk";
import { getColor } from "../utils/color";
import { Request, Response } from "express";
import { LocMetrics } from "../@types/LocMetrics";
import { CustomResponse } from "../@types/CustomResponse";

export async function createLocMetrics(req: Request, res: Response) {
  try {
    const {
      avgSpeed,
      peopleCount,
      campusName,
      lumen,
      latitude,
      longitude,
    }: LocMetrics = req.body;
    // if (
    //   !avgSpeed ||
    //   !peopleCount ||
    //   !lumen ||
    //   !latitude ||
    //   !longitude ||
    //   !campusName
    // )
    //   return res
    //     .status(400)
    //     .send(
    //       new CustomResponse(
    //         "Field Required: avgSpeed, peopleCount, campusName, lumen, latitude, longitude"
    //       )
    //     );
    const risk = getRisk(avgSpeed, peopleCount, lumen);
    const speedPeople = await prisma.locMetrics.create({
      data: {
        avgSpeed: avgSpeed,
        peopleCount: peopleCount,
        campusName: campusName,
        lumen: lumen,
        riskRating: risk,
        latitude: latitude,
        longitude: longitude,
        color: getColor(risk),
      },
    });
    if (!speedPeople)
      return res
        .status(400)
        .send(new CustomResponse("Location Metrics not created"));
    res
      .status(201)
      .send(new CustomResponse("Location Metrics created", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function updateLocMetrics(req: Request, res: Response) {
  try {
    const {
      avgSpeed,
      peopleCount,
      campusName,
      lumen,
      latitude,
      longitude,
      sentiment,
    }: LocMetrics = req.body;
    // if (
    //   !avgSpeed ||
    //   !peopleCount ||
    //   !campusName ||
    //   !lumen ||
    //   !latitude ||
    //   !longitude ||
    //   !req.params.id
    // )
    //   return res
    //     .status(400)
    //     .send(
    //       new CustomResponse(
    //         "Field Required: avgSpeed, peopleCount, campusName, lumen, latitude, longitude, id"
    //       )
    //     );
    const risk = getRisk(avgSpeed, peopleCount, lumen);
    const speedPeople = await prisma.locMetrics.update({
      where: {
        id: req.params.id,
      },
      data: {
        avgSpeed: avgSpeed,
        peopleCount: peopleCount,
        lumen: lumen,
        riskRating: risk,
        latitude: latitude,
        longitude: longitude,
        color: getColor(risk),
        campusName: campusName,
        sentiment: sentiment,
      },
    });
    // if (!speedPeople)
    //   return res
    //     .status(400)
    //     .send(new CustomResponse("Location Metrics not updated"));
    res
      .status(201)
      .send(new CustomResponse("Location Metrics updated", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function updateLocMetricsByCampus(req: Request, res: Response) {
  try {
    const {
      avgSpeed,
      peopleCount,
      lumen,
      latitude,
      longitude,
      sentiment,
    }: LocMetrics = req.body;
    // if (!avgSpeed || !peopleCount || !lumen || !req.params.id)
    //   return res
    //     .status(400)
    //     .send(
    //       new CustomResponse(
    //         "Field Required: avgSpeed, peopleCount, lumen, campusName"
    //       )
    //     );
    const risk = getRisk(avgSpeed, peopleCount, lumen);
    const speedPeople = await prisma.locMetrics.updateMany({
      where: { campusName: req.params.id },
      data: {
        avgSpeed: avgSpeed,
        peopleCount: peopleCount,
        lumen: lumen,
        riskRating: risk,
        latitude: latitude,
        longitude: longitude,
        color: getColor(risk),
        sentiment: sentiment,
      },
    });
    // if (!speedPeople)
    //   return res
    //     .status(400)
    //     .send(new CustomResponse("Location Metrics not updated"));
    res
      .status(201)
      .send(new CustomResponse("Location Metrics updated", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function getLocMetrics(req: Request, res: Response) {
  try {
    const speedPeople = await prisma.locMetrics.findMany({});
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function getLocMetricsByCampus(req: Request, res: Response) {
  try {
    // if (!req.params.id)
    //   return res
    //     .status(400)
    //     .send(new CustomResponse("Campus Name is required"));
    const speedPeople = await prisma.locMetrics.findMany({
      where: { campusName: req.params.id },
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function getLocMetricsByRisk(req: Request, res: Response) {
  try {
    // if (!req.params.id)
    //   return res
    //     .status(400)
    //     .send(new CustomResponse("Risk Rating is required"));
    const riskRating = Number(req.params.id);
    const speedPeople = await prisma.locMetrics.findMany({
      where: { riskRating: { gt: riskRating } },
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function getLocMetricsbyTime(req: Request, res: Response) {
  try {
    // if (!req.params.id)
    //   return res.status(400).send(new CustomResponse("ID is required"));
    const speedPeople = await prisma.locMetrics.findMany({
      where: { updatedAt: { gt: req.params.id } },
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function getLocMetricsByCoordinates(req: Request, res: Response) {
  try {
    // if (!req.params.latitude || !req.params.longitude)
    //   return res
    //     .status(400)
    //     .send(new CustomResponse("Latitude and Longitude are required"));
    const { latitude, longitude }: Pick<LocMetrics, "latitude" | "longitude"> =
      req.params as unknown as LocMetrics;
    const speedPeople = await prisma.locMetrics.findFirst({
      where: { latitude: latitude, longitude: longitude },
      select: {
        latitude: true,
        longitude: true,
        riskRating: true,
        color: true,
        peopleCount: true,
        avgSpeed: true,
      },
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

// sort updated at in descending order
// group by campusName
// get the first element of each group
export async function getLatestData(req: Request, res: Response) {
  try {
    const speedPeople = await prisma.locMetrics.groupBy({
      by: ["campusName", "updatedAt"],
      _count: { _all: true },
      orderBy: { updatedAt: "desc" },
      take: 1,
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics found", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}

export async function deleteLocMetrics(req: Request, res: Response) {
  try {
    const speedPeople = await prisma.locMetrics.delete({
      where: { id: req.params.id },
    });
    if (!speedPeople)
      return res
        .status(404)
        .send(new CustomResponse("Location Metrics not found"));
    res
      .status(200)
      .send(new CustomResponse("Location Metrics deleted", speedPeople));
  } catch (error) {
    console.log(error);
    res.status(500).send(new CustomResponse("Internal Server Error"));
  }
}
