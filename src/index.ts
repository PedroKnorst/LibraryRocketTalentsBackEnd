import * as express from "express";
import bookRouter from "./book/bookRouter";
import userRouter from "./user/userRouter";
import * as cors from "cors";

const app = express();

app.use(express.static("public"));

app.use("/static", express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/", bookRouter);
app.use("/", userRouter);

app.listen(3001, () => {
  console.log("Server is online! Access on http://localhost:3001");
});
