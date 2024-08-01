import dotenv from "dotenv"
import express from "express"
import calculateRequestProcessTime from "./middlewares/reqHandler.js";
import userRouter from './routers/user.js'
import notFound from './middlewares/errorHandler.js'
import postRouter from "./routers/post.js";

const app = express();
const PORT= process.env.PORT;

dotenv.config();
app.use(calculateRequestProcessTime);
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

