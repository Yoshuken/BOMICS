const express = require("express");
const router = express.Router();
const conexionMySQL = require("../utilities/connexion");
const { v4: uuid_v4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// bycrypt setup
const saltRounds = 10;

router.post('/signUp', async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !email || !password) {
            return res.status(200).json({ status: 204, message: "Don't leave empty fields" });
        }

        const emailCount = conexionMySQL.query('select * from user where email = ?', [email]);
        if (emailCount.length > 0) {
            return res.status(409).json({ status: 409, message: "This Email is already registered" });
        }

        const id = uuid_v4();
        const hash = bcrypt.hashSync(password, saltRounds);
        conexionMySQL.query("insert into user values (?, ?, ?, ?)", [id, username, email, hash]);
        res.status(200).json({ status: 200, message: "You have successfully registered!" });
    } catch (err) {
        handleError(res, err, "Sign up error")
    }
});


router.post('/signIn', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(200).json({ status: 204, message: "Please fill all the fields" });
        }
        const result = await conexionMySQL.query("select * from user where email = ?", [email]);
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password) == true) {
                const token = jwt.sign({ email }, process.env.SECRET_WORD, { expiresIn: "24h" });
                return res.status(200).json({ status: 200, token: token });
            }
        }
        res.status(401).json({ status: 401, message: "Incorrect login values, try again" });
    } catch (err) {
        return res.status(500).json({ status: 500, message: "Server Error: " + err });
    }
});

router.get("/getEmail", async (req, res) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(200).json({ status: 403, message: "No token was received" });
    }
    try {
      const payload = jwt.verify(token, process.env.SECRET_WORD);
      res.status(200).json({status:200, email: payload.email});
    } catch (error) {
      return res.status(200).json({ status: 403, message: "Invalid Token" });
    }
});

const handleError = (res, error, mensaje) => {
    console.error(error);
    res.status(500).json({
        status: 500,
        message: `${mensaje}. ${error}`,
    });
};


module.exports = router;
