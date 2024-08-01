require('dotenv').config();
const express = require('express');
const calculateRequestProcessTime = require('./middlewares/reqHandler');
const userRouter = require('./routers/user');
const { notFound } = require('./middlewares/errorHandler');
const app = express();
const PORT= process.env.PORT;


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

