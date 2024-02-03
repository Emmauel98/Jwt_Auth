const Users = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "An error occured", error });
  }
};

const getUserByFirstname = async (req, res) => {
  try {
    const { name } = req.query;
    const validName = name.replace(/^"|"$/g, "");
    const user = await Users.find({ First_name: validName });
    let data = [];

    user.map((user) => {
      data = [
        ...data,
        {
          First_name: user.First_name,
          Last_name: user.Last_name,
        },
      ];
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "No user found" });
  }
};

const createNewUser = async (req, res) => {
  try {
    const body = req.body;

    // Validate user: Check if user exists before
    const { Email } = req.body;
    const olderUser = await Users.find({ Email });
    if (olderUser.length > 0) {
      return res.status(409).json({ msg: "user already exists" });
    }

    // encrypt password
    // const salt = bcryptjs.genSalt(10)
    const encryptedPassword = await bcryptjs.hash(body.Password, 10);

    // store new user in DB
    const configUser = {
      First_name: body.First_name,
      Last_name: body.Last_name,
      Email: body.Email.toLowerCase(),
      Password: encryptedPassword,
    };
    const user = await Users.create(configUser);
    const token = jwt.sign(
      { userId: user._id, userEmail: user.Email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "3h" }
    );
    // return new user
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ msg: "An error occured", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log(userId);
  
    const user = await Users.findByIdAndDelete({_id:userId});
    if(!user){
      return res.status(404).json({msg:"user does not exist"})
    }
    res.status(200).json({msg:"user deleted"})
  } catch (error) {
    res.status(500).json({msg:"something went wrong. Please retry."})
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  getUserByFirstname,
  deleteUser,
};

// crypto.randomBytes(16).toString('hex');
// If you want to run Node.js code directly in the terminal without creating a file, you can use the Node.js REPL (Read-Eval-Print Loop). The Node.js REPL allows you to interact with Node.js in an interactive mode directly from the terminal.
