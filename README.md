MVC:
    MVC is a software design pattern used to organize code into 3 parts, making applications clean, scalable, and easy to maintain.
    MVC stands for:

Model
View
Controller

It separates:

Data (Model)
UI (View)
Logic (Controller)


1. Model (Data Layer)
🔹 What it does:
Manages data and database
Handles business logic
Interacts with DB (CRUD operations)
🔹 Example:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('User', userSchema);



2. View (Presentation Layer)
🔹 What it does:
Displays data to the user
UI (HTML, CSS, frontend templates)
🔹 Example:
<h1>User Name: <%= user.name %></h1>


3. Controller (Logic Layer)----> Brain of the APP
🔹 What it does:
Connects Model and View
Handles user requests
Processes input and returns response
🔹 Example:
const User = require('../models/user');

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('user', { user });
};
project/
│
├── models/
│   └── user.js
│
├── views/
│   └── user.ejs
│
├── controllers/
│   └── userController.js
│
├── routes/
│   └── userRoutes.js
│
└── app.js

image:   ![alt text](image-2.png) 