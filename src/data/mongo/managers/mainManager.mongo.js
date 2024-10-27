import { Types } from "mongoose";

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    create = async (data) => {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw error;
        }
    };

    readAll = async (filter) => {
        try {
            return await this.model.find(filter, "-__v").lean();
        } catch (error) {
            throw error;
        }
    };

    paginate = async (filter, opts) => {
        try {
            return await this.model.paginate(filter, { ...opts, lean: true });
        } catch (error) {
            throw error;
        }
    };

    read = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error;
        }
    };

    update = async (id, data) => {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw error;
        }
    };

    destroy = async (id) => {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    };

    calculateTotal = async (id) => {
        try {
            const total = await this.model.aggregate([
                { $match: { user_id: new Types.ObjectId(id) } },
                { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "product_id" } },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"] } } },
                { $set: { subtotal: { $multiply: ["$quantity", "$price"] } } },
                { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
                { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() } },
                { $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user_id" } },
                { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user_id", 0] }, "$$ROOT"] } } },
                { $project: { user_id: 0, password: 0, age: 0, role: 0, __v: 0, isOnline: 0 } },
            ]);
            return total;
        } catch (error) {
            throw error;
        }
    };
}

export default MongoManager;
