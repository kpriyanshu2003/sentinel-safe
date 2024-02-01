import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compress from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
// import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 3300;
export const prisma = new PrismaClient();

import authRoutes from "./src/routes/auth";
import prismaRoutes from "./src/routes/prisma";

app.use(compress());
app.use(cors({ origin: "*" }));
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use("/auth", authRoutes);
app.use("/prisma", prismaRoutes);

app.use("/", (req: Request, res: Response) => {
  res.status(200).send({
    status: 200,
    message: "API is working fine!",
  });
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
