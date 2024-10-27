import productsMongoManager from "../data/mongo/managers/product.manager.js";

const create = async (req, res, next) => {
    try {
        const data = req.body;
        const { _id } = await productsMongoManager.create(data);
        res.status(201).json({ message: "Product successfully created", id: _id });
    } catch (error) {
        next(error);
    }
};

const readAll = async (req, res, next) => {
    try {
        const filter = req.query;
        const products = await productsMongoManager.readAll(filter);
        if (products.length === 0) throw { statusCode: 404, message: "No products found matching the provided filter" };
        res.status(200).json({ message: "Products successfully retrieved", products });
    } catch (error) {
        next(error);
    }
};

async function showAllProducts(req, res, next) {
    try {
        const filter = req.query;
        const products = await productsMongoManager.readAll(filter);

        if (!products || products.length === 0) {
            return res.status(404).render("error", { message: "No products found." });
        }

        return res.render("products", { data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return next(new Error("An error occurred while retrieving products. Please try again later."));
    }
}

async function showOneProduct(req, res, next) {
    try {
        const { pid } = req.params.pid;
        const product = await productsMongoManager.read(pid);
        if (product) {
            return res.render("productDetail", { data: product });
        }
        handleError(`Product with ID ${pid} not found`, 404);
    } catch (error) {
        next(error);
    }
}

const paginate = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const { docs, prevPage, hasPrevPage, nextPage, hasNextPage } = await productsMongoManager.paginate({}, { page, limit });
        if (docs.length === 0) throw { statusCode: 404, message: "No products found for the requested page" };
        res.status(200).json({ message: "Products successfully retrieved", products: docs, prevPage, hasPrevPage, nextPage, hasNextPage });
    } catch (error) {
        next(error);
    }
};

const read = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productsMongoManager.read(pid);
        if (!product) throw { statusCode: 404, message: `Product with ID ${pid} not found` };
        res.status(200).json({ message: "Product successfully retrieved", product });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const updatedProduct = await productsMongoManager.update(pid, data);
        if (!updatedProduct) throw { statusCode: 404, message: `Product with ID ${pid} not found` };
        res.status(200).json({ message: "Product successfully updated", updatedProduct });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productsMongoManager.destroy(pid);
        if (!deletedProduct) throw { statusCode: 404, message: `Product with ID ${pid} not found` };
        res.status(200).json({ message: "Product successfully deleted", deletedProduct });
    } catch (error) {
        next(error);
    }
};

export { create, readAll, showAllProducts, showOneProduct, paginate, read, update, destroy };
