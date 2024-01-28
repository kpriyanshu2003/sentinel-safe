import express, { Request, Response } from "express";
import cors from "cors";
import compress from "compression";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", (req: Request, res: Response) => {
  res.send({
    status: 200,
    message: "Success",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
