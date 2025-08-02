const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany(); 
    res.json(posts);
}