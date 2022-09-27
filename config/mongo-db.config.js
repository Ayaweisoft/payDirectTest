const mongoose = require('mongoose');
const { MONGODB_URI } = require("./../config");

const options = {
     useUnifiedTopology: true,
};

module.exports = async () => {
     try {
          // console.log("uri: ", MONGODB_URI);
          await mongoose.connect(MONGODB_URI, options)
          console.log(':::> Connected to MongoDB database')
     } catch (error) {
          console.log("<::: Couldn't connect to database ", error)
     }
};