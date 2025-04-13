// Import the express framework & define app
const express = require("express");
const app = express();

// Function to validate input parameters
function validateNum(req, res, next) {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ statuscode: 400, error: "Invalid input. Please input numbers for both n1 & n2." });
    }

    req.n1 = n1;
    req.n2 = n2;
    next();
}

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to this page! Use /add, /subtract, /multiply, or /divide to view different arithmetic operation.");
});

// Addition endpoint
app.get("/add", validateNum, (req, res) => res.json({ statuscode: 200, data: req.n1 + req.n2 }));

// Subtraction endpoint
app.get("/subtract", validateNum, (req, res) => res.json({ statuscode: 200, data: req.n1 - req.n2 }));

// Multiplication endpoint
app.get("/multiply", validateNum, (req, res) => res.json({ statuscode: 200, data: req.n1 * req.n2 }));

// Division endpoint
app.get("/divide", validateNum, (req, res) => {

    // Display error message when the second input is equal 0
    if (req.n2 === 0) {
        return res.status(400).json({ statuscode: 400, error: "Cannot divide by zero." });
    }
    res.json({ statuscode: 200, data: req.n1 / req.n2 });
});

// Define port number
const port = 3040;

//Start the server
app.listen(port,()=> {
    console.log("Hello I'm listening to port " + port);
})