const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./Model/Userschema");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.post("/api-user/add", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    country,
    state,
    gender,
    dateOfBirth,
    age,
    city,
  } = req.body;

  try {
    const newUser = new User({
      firstName: first_name,
      lastName: last_name,
      email: email,
      city: city,
      country: country,
      state: state,
      gender: gender,
      dateOfBirth: new Date(dateOfBirth),
      age: age,
    });

    const savedUser = await newUser.save();
    const userId = savedUser.id;

    res
      .status(200)
      .json({
        success: true,
        message: "User added successfully",
        userId: userId,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add user" });
  }
});
app.get("/api-user/:userid", async (req, res) => {
  const id = req.params.userid;
  try {
    const users = await User.findById(id);
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});
app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
