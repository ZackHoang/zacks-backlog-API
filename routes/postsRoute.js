const { Router } = require("express");
const { getAllPosts } = require("../controllers/postsController");
const postsRoute = Router();

postsRoute.get("/", getAllPosts);

module.exports = postsRoute;