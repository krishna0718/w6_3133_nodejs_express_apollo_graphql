const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Movie = require("./models/Movie");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Failed", err));


fs.readFile("Sample_Movies_Records.json", "utf8", async (err, data) => {
    if (err) {
        console.error("❌ Error reading file:", err);
        return;
    }
    
    try {
        const movies = JSON.parse(data);
        await Movie.insertMany(movies);
        console.log("✅ Sample movies inserted successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error inserting movies:", error);
    }
});
