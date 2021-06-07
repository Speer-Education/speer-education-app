const functions = require("firebase-functions");
const express = require("express");
const { check, validationResult } = require("express-validator");
var cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

app.post("/stayintouch",[
      check("email").not().isEmpty(), 
      check("email").normalizeEmail().isEmail()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, errors: errors.array() });
        }

        const { name, school, year, email } = req.body;
        console.log(req.body);

        return res
        .status(200)
        .json({ status: true, body: req.body })
    }
);

exports.app = functions.https.onRequest(app);
