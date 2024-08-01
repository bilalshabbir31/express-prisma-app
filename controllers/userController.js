import Prisma from "../config/prismaClient.js";

const createUser = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(402).json({ message: "All fields are mandatory!" });
  } else {
    try {
      const user = await Prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await Prisma.user.findMany();
    if (users.length == 0 ) {
      res.status(404).json({message: "Users table are empty!"})
    }else{
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({error})
  }
  
}

const getUser = async (req, res) => {
  try {
    const user = await Prisma.user.findUnique({
      where: { id: req.params.userId }
    });
    if (user.empty) {
      res.status(404).json({ message: "Users table are empty!" });
    }else{
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      res.status(402).json({ message: "All fields are mandatory!" });
    } else {
      const existingUser = await Prisma.user.findUnique({
        where: {
          id: req.params.userId,
        },
      });
      const updatedUser = await Prisma.user.update({
        where: {
          email: existingUser.email,
        },
        data: {
          name: name,
          password: password,
        },
      });
      res.status(204).json({ message: "Sucessfully Updated! ", updatedUser });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const existingUser = await Prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    await Prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export { createUser, fetchAllUsers, getUser, updateUser, deleteUser };
