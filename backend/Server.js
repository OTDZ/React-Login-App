// Initialize packages
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// MySql Connection
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "password",
    database: "login"
})

// Checks whether login details exist
app.post('/login', (req, res) => {
    const getLoginDetails = "SELECT * FROM login_details WHERE email = ? AND password = ?";
    db.query(getLoginDetails, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            if (data.length > 0) {
                const id = data[0].UserID;
                // Generate JWT - Secret should be stored securely
                const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: 300});
                return res.json({validLogin: true, role: data[0].role, token: token});
            } else {
                return res.json({validLogin: false})
            }
        }
    })
})

// Creates new record of login details
app.post("/signup", (req, res) => {
    const createLoginDetails = "INSERT INTO login_details (email, password, role) VALUES (?)";
    const values = [
        req.body.email,
        req.body.password,
        req.body.role
    ]
    db.query(createLoginDetails, [values], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.listen(8081, () => {
    console.log("Listening...");
})