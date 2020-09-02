//set up schemas and connect to database

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const mongoose = require('mongoose');

// Connect to MongoDB
CONNECTION_STRING =
    "mongodb+srv://adminUser:<password>@podoju.on8l0.mongodb.net/<dbname>?retryWrites=true&w=majority";

MONGO_URL = CONNECTION_STRING
    .replace("<username>", process.env.MONGO_USERNAME)
    .replace("<password>", process.env.MONGO_PASSWORD);

//TODO: change dbName to something in .env
//connect to the mongoDB database
mongoose.connect(MONGO_URL || "mongodb://localhost/COMP30022", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME
});

const model = mongoose.connection;
model.on("error", err => {
    console.error(err);
    process.exit(1);
});
model.once("open", async () => {
    console.log("Mongo connection started on " + model.host + ":" + model.port);
});

//import the other collections
require('./User');
require('./Media');