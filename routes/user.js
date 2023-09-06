const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const { getAllUsers, createNewUser, getUserByFirstname, deleteUser } = require("../controller/user");
router.use(express.json());

// router.get("/", getAllUsers);
// router.post("/", createNewUser);

router.get("/query",getUserByFirstname);
router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').delete(deleteUser)
module.exports = router;
