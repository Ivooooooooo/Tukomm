import { Schema, Types, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "carts"
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    product_id: { type: Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 1 },
    state: { type: String, default: "reserved", enum: [ "reserved", "pais", "delivered" ] },
});

schema.pre(
    "find",
    function () {
        this.populate("user_id", "email -_id");
        this.populate("product_id", "-_id -__v -stock -price");
    }
);

schema.pre(
    "findOneAndUpdate",
    function () {
        this.populate("user_id", "email -_id");
        this.populate("product_id", "-_id -__v -stock -price");
    }
);

schema.plugin(mongoosePaginator);
const Cart = model(collection, schema);
export default Cart;