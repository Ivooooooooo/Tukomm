import Cart from "../models/cart.model.js";
import MongoManager from "./mainManager.mongo.js";

const cartsMongoManager = new MongoManager(Cart)
export default cartsMongoManager