const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
const SecretKey = "HareKrishna"

app.get('/', (req, res) => {
    res.send("Hi! I am from Backend")
})

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: "krishna",
        email: "abc@123"
    }
    jwt.sign({ user }, SecretKey, { expiresIn: '30s' }, (err, token) => {
        res.json({ token })
    })
})

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, SecretKey, (err, authData) => {
        if (err) {
            res.send({ result: "Invalid Token" })
        }
        else {
            res.json({
                message: "profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    console.log(req)
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.send({
            result: 'Token is not valid'
        })
    }
}

app.listen(3000, () => {
    console.log("App is Running on 3000")
})

