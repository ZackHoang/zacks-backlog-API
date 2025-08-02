const bcrypt = require("bcryptjs");
const { PrismaClient, Prisma } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.signUp = async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        isAdmin: false,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
      },
    });
    res.json(req.body);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res.status(400).json({
          error: "Username already exists. Please choose another one",
        });
      }
    }
  }
};
