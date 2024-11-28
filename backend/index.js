const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174', 'https://book-inventory-eta.vercel.app/'],
    credentials: true
}));

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// root route
app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
});

// database connection
async function main() {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
    });
}

main()
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
