const express = require("express");
const router = express.Router();
const login = require('../controller/loginUser');
const AuthenticateToken = require("../middleware/AuthenticateToken");


router.use(express.json());

router.post("/",AuthenticateToken,login );
module.exports = router;
