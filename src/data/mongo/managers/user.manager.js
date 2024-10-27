import User from "../models/user.model.js";
import MongoManager from "./mainManager.mongo.js";

const usersMongoManager = new MongoManager(User);

export default usersMongoManager;