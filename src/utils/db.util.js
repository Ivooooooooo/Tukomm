import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(process.env.MONGO_CONN);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;