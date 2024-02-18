import { Request, Response } from "express";
import { prisma } from "../../index";
import { getColor } from "../utils/color";
import { getRisk } from "../utils/risk";
import { LocMetrics } from "../@types/LocMetrics";

export async function createLocMetrics(req: Request, res: Response) {
  const {
    avgSpeed,
    peopleCount,
    campusName,
    lumen,
    latitude,
    longitude,
  }: LocMetrics = req.body;
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
  res.status(201).json(speedPeople);
}

export async function updateLocMetrics(req: Request, res: Response) {
  const { avgSpeed, peopleCount, campusName, lumen }: LocMetrics = req.body;
  const speedPeople = await prisma.locMetrics.update({
    where: { campusName: campusName },
    data: {
      avgSpeed: avgSpeed,
      peopleCount: peopleCount,
      lumen: lumen,
    },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetrics(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.findMany({});
  res.status(200).json(speedPeople);
}

export async function getLocMetricsByCampus(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.findUnique({
    where: { campusName: req.params.id },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetricsByRisk(req: Request, res: Response) {
  const riskRating = Number(req.params.id);
  const speedPeople = await prisma.locMetrics.findMany({
    where: { riskRating: { gt: riskRating } },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetricsbyTime(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.findMany({
    where: { updatedAt: { gt: req.params.id } },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetricsByCoordinates(req: Request, res: Response) {
  const { latitude, longitude }: Pick<LocMetrics, "latitude" | "longitude"> =
    req.params as unknown as LocMetrics;
  const speedPeople = await prisma.locMetrics.findFirst({
    where: {
      latitude: latitude,
      longitude: longitude,
      updatedAt: { gt: new Date(new Date().getTime() - 3600000) },
    },
    select: {
      latitude: true,
      longitude: true,
      riskRating: true,
      color: true,
      peopleCount: true,
      avgSpeed: true,
    },
  });
  res.status(200).json(speedPeople);
}

export async function deleteLocMetrics(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.delete({
    where: { id: req.params.id },
  });
  res.status(200).json(speedPeople);
}
