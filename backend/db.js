const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/myiNotebook" //myiNotebook is going to be the name of the database that will be created and localhost:27017 acts as your server

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
}
module.exports = connectToMongo;