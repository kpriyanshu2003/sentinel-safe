import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compress from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 3300;
export const prisma = new PrismaClient();

import authRoutes from "./src/routes/auth";
import prismaRoutes from "./src/routes/prisma";
import locMetricsRoutes from "./src/routes/locmetrics";
import getCodeRoutes from "./src/routes/geoCode";
import { ChatMessage } from "./src/@types/ChatMessage";
import initRoutes from "./src/routes/init";

app.use(compress());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use("/auth", authRoutes);
app.use("/prisma", prismaRoutes);
app.use("/locmetrics", locMetricsRoutes);
app.use("/geo", getCodeRoutes);
app.use("/init", initRoutes);

app.use("/", (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "Sentienl Safe API is working fine!",
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    url: req.url,
    headers: req.headers,
    cookies: req.cookies,
  });
});

io.on("connection", (socket: Socket) => {
  socket.on("user-joined", (name: string) => {
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("chatMessage", (message: ChatMessage) => {
    socket.broadcast.emit("chatMessage", {
      text: message.text,
      userDetails: message.userDetails,
      type: "receive",
    });
  });

  socket.on("disconnect", () => {
    console.log("someone disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: "Something Broke!" });
});
