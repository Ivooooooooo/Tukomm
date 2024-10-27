import cartsMongoManager from "../data/mongo/managers/cart.manager.js";

const create = async (req, res, next) => {
    try {
        const data = req.body;
        const { _id } = await cartsMongoManager.create(data);
        return res.status(201).json({ message: "Cart successfully created", cartId: _id });
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const filter = req.query;
        const carts = await cartsMongoManager.readAll(filter);
        if (carts.length === 0) throw { statusCode: 404, message: "No carts found with the specified filter" };
        res.status(200).json({ message: "Carts successfully retrieved", totalCarts: carts.length, carts });
    } catch (error) {
        next(error);
    }
};

const read = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartsMongoManager.read(cid);
        if (!cart) throw { statusCode: 404, message: `Cart with ID ${cid} not found` };
        res.status(200).json({ message: "Cart successfully retrieved", cart });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const data = req.body;
        const updatedCart = await cartsMongoManager.update(cid, data);
        if (!updatedCart) throw { statusCode: 404, message: `Cart with ID ${cid} not found` };
        res.status(200).json({ message: "Cart successfully updated", updatedCart });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deletedCart = await cartsMongoManager.destroy(cid);
        if (!deletedCart) throw { statusCode: 404, message: `Cart with ID ${cid} not found` };
        res.status(200).json({ message: "Cart successfully deleted", deletedCart });
    } catch (error) {
        next(error);
    }
};

const calculateTotal = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const total = await cartsMongoManager.calculateTotal(uid);
        res.status(200).json({ message: "Total calculated successfully", total });
    } catch (error) {
        next(error);
    }
};

export { create, readAll, read, update, destroy, calculateTotal };
