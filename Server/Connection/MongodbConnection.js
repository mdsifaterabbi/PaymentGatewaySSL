import mongoose from "mongoose";
import colors from "colors";
//user: user01
//pass: rjmsJK0c1BsRCYRX

const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://user01:rjmsJK0c1BsRCYRX@payment101cluster.mauq5ii.mongodb.net/Payment101"
    );
    console.log(
      `Connected to MongoDB database: ${response.connection.name}`.bgBlack
        .yellow
    );
  } catch (error) {
    handleError(error);
    console.log(`Error occurred in ${error}`.bgRed.white);
  }
};

export default connectDB;
