import { Request, Response } from "express";
import { prisma } from "../../index";
import { getColor } from "../utils/color";
import { getRisk } from "../utils/risk";

export async function createLocMetrics(req: Request, res: Response) {
  const { speed, people, location, lumen, lat, lng } = req.body;
  const risk = getRisk(speed, people, lumen);
  const speedPeople = await prisma.locMetrics.create({
    data: {
      avgSpeed: speed,
      peopleCount: people,
      campusName: location,
      lumen: lumen,
      riskRating: risk,
      latitude: lat,
      longitude: lng,
      color: getColor(risk),
    },
  });
  res.status(201).json(speedPeople);
}

export async function updateLocMetrics(req: Request, res: Response) {
  const { speed, people, location, time, lumen } = req.body;
  const speedPeople = await prisma.locMetrics.update({
    where: {
      campusName: location,
      updatedAt: time,
    },
    data: {
      avgSpeed: speed,
      peopleCount: people,
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
    where: {
      campusName: req.params.id,
    },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetricsByRisk(req: Request, res: Response) {
  const riskRating = Number(req.params.id);
  const speedPeople = await prisma.locMetrics.findMany({
    where: {
      riskRating: {
        gt: riskRating,
      },
    },
  });
  res.status(200).json(speedPeople);
}

export async function getLocMetricsbyTime(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.findMany({
    where: {
      updatedAt: {
        gt: req.params.id,
      },
    },
  });
  res.status(200).json(speedPeople);
}

export async function deleteLocMetrics(req: Request, res: Response) {
  const speedPeople = await prisma.locMetrics.delete({
    where: {
      campusName: req.params.id,
    },
  });
  res.status(200).json(speedPeople);
}
