const mongoose = require('mongoose');

const connect = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/nodejsjwt", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("MongoDB is Up:)");
        })
        .catch((error) => {
            console.log("MongoDb connection error!!!");
            console.error(error);
            process.exit(1);
        });
}

module.exports={connect};
