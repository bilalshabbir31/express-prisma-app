import dotenv from "dotenv"
import express from "express"
import calculateRequestProcessTime from "./middlewares/reqHandler.js";
import userRouter from './routers/user.js'
import notFound from './middlewares/errorHandler.js'
const app = express();
const PORT= process.env.PORT;

dotenv.config();
app.use(calculateRequestProcessTime);
app.use(express.json());
app.use(userRouter);
app.use(notFound);
// app.get("/fetch", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.status(200).json(users);
// });

// app.get("/create-post", async (req, res) => {
//   try {
//     const post = await prisma.post.create({
//       data: {
//         title: "bilal email",
//         description: "sjshjfdgfhjdnvfbsdnfvdnfgdsjfndsgfdsjfg"
//       },
//     })
//     console.log(post);
//     res.status(201).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Post creation failed" });
//   }
// });

// app.get("/fetch-posts", async (req, res) => {
//   const posts = await prisma.post.findMany();
  
//   if (posts.length == 0){
//     res.status(404).json({message: "Empty Post table"});
//   }else {
//     res.status(200).json({posts});
//   } 
// });

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

