const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

// Connect to MongoDB (without deprecated options)
mongoose.connect('mongodb+srv://myuser:passwordpassword@clusterwebsite.ocvxi.mongodb.net/', { })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Mock User Data (You can later update this to pull data from MongoDB)
const users = [
  {
    id: "1",
    name: "Ali Qamber Zaidi",
    studentId: "301415368",
    image: "/ali.ico",  // Path to the image inside 'public' directory
    bio: "Ali is a senior student majoring in Computer Science. He loves coding and playing chess.",
    hobbies: ["Coding", "Chess", "Traveling"],
  },
  {
    id: "2",
    name: "Hugo Logan Raymundo Angeles",
    studentId: "301350348",
    image: "/logan.ico",  // Path to the image inside 'public' directory
    bio: "Hugo is a passionate software developer with a knack for creating beautiful user interfaces.",
    hobbies: ["Drawing", "Gaming", "Photography"],
  },
  {
    id: "3",
    name: "Jiyanne Tuazon",
    studentId: "301320584",
    image: "/jiya.ico",  // Path to the image inside 'public' directory
    bio: "Jiyanne is a talented database administrator who loves exploring new technologies.",
    hobbies: ["Reading", "Cooking", "Coding"],
  },
];

// Serve Main Page (Users List)
app.get("/", (req, res) => {
  let userList = users.map((user) => {
    return `
      <li>
        <img src="${user.image}" alt="${user.name}'s Profile" width="50" height="50">
        <strong>${user.name}</strong>
        <a href="/users/${user.id}">View Details</a>
      </li>
    `;
  }).join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Users</title>
    </head>
    <body>
      <header>
        <h1>All Users</h1>
      </header>
      <main>
        <ul>${userList}</ul>
      </main>
    </body>
    </html>
  `);
});

// Serve User Details
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${user.name}'s Profile</title>
      </head>
      <body>
          <header>
              <h1>${user.name}'s Profile</h1>
          </header>
          <main>
              <img src="${user.image}" alt="${user.name}'s Profile" width="100" height="100">
              <p><strong>Student ID:</strong> ${user.studentId}</p>
              <p><strong>Bio:</strong> ${user.bio}</p>
              <p><strong>Hobbies:</strong> ${user.hobbies.join(", ")}</p>
              <a href="/">Back to Users</a>
          </main>
      </body>
      </html>
    `);
  } else {
    res.status(404).send("<h1>User Not Found</h1>");
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
