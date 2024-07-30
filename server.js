require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT= process.env.PORT;


app.use((req, res, next) => {
  const start = Date.now();
  next();
  // action go here...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url
  } ${delta}ms`);
  console.log();
});

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: "infinityloop31@gmail.com",
        name: "Arindam Majumder",
        password: "12345678",
      },
    });
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User creation failed" });
  }
});

app.get("/fetch", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.get("/create-post", async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: "bilal email",
        description: "sjshjfdgfhjdnvfbsdnfvdnfgdsjfndsgfdsjfg"
      },
    })
    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Post creation failed" });
  }
});

app.get("/fetch-posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  
  if (posts.length == 0){
    res.status(404).json({message: "Empty Post table"});
  }else {
    res.status(200).json({posts});
  } 
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});

