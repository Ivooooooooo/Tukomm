import Product from "../models/product.model.js";
import MongoManager from "./mainManager.mongo.js";

const productsMongoManager = new MongoManager(Product);
export default productsMongoManager;