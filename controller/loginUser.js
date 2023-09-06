const Users = require("../models/user");
const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require('dotenv').config();


const login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
      
      // Confirm Credential
      if (!Email || !Password) {
        return res
          .status(400)
          .json({ msg: "Please Provide a valid Email and Password" });
      };
  
      // Password Auth
      const user = await Users.find({ Email });
      if (user.length > 0) {
        const comparePassword = await bcryptjs.compare(Password, user[0].Password);
        if (comparePassword) {
          return res.status(200).json({ user });
        } else {
        return res.status(401).json({ msg: "Invaid Credentials" });
      }
    }
    else{
      return res.status(404).json({ msg: "User not found" });
    }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    };
  }

  module.exports = login