import express, { Request, Response } from "express";
import cors from "cors";
import compress from "compression";
import dotenv from "dotenv";
import morgan from "morgan";
// import Logger from "phyrlogs";

dotenv.config();
const app = express();
const port = process.env.PORT || 3300;

import authRoutes from "./src/routes/auth";

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.use("/", (req: Request, res: Response) => {
  // let logger = new Logger("a", "b");
  // logger.s
  res.send({
    status: 200,
    message: "Success",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
