import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: "https://mirrors.ctan.org/macros/latex/contrib/incgraph/example.jpg",
    },
    role: { type: Number, enum: [0, 1, 2], default: 0, index: true },
});

schema.plugin(mongoosePaginator);

const User = model(collection, schema);
export default User;
