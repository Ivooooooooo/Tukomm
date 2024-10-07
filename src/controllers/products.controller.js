import productsManager from "../data/products.manager.js";

const handleError = (message, statusCode = 404) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};

async function getAllProducts(req, res, next) {
    try {
        const { category } = req.query;
        const response = await productsManager.readAll(category);
        if (response.length > 0) {
            return res.status(200).json({ message: "Products retrieved successfully", response });
        }
        handleError("No products found for the given category", 404);
    } catch (error) {
        next(error);
    }
}

async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.read(pid);
        if (response) {
            return res.status(200).json({ message: "Product retrieved successfully", response });
        }
        handleError(`Product with ID ${pid} not found`, 404);
    } catch (error) {
        next(error);
    }
}

async function createProduct(req, res, next) {
    try {
        const {
            title,
            photo = "defaultPFP.png",
            price = 1,
            stock = 1,
            category = "default"
        } = req.body;

        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).json({ error: "Product title is required and must be a non-empty string." });
        }

        const numericPrice = parseFloat(price);
        const numericStock = parseInt(stock, 10);

        if (isNaN(numericPrice) || numericPrice < 0) {
            return res.status(400).json({ error: "Product price must be a non-negative number." });
        }

        if (isNaN(numericStock) || numericStock < 0) {
            return res.status(400).json({ error: "Stock must be a non-negative integer." });
        }

        const productData = {
            title,
            photo,
            price: numericPrice,
            stock: numericStock,
            category
        };

        const response = await productsManager.create(productData);
        return res.status(201).json({ message: "Product created successfully", response });

    } catch (error) {
        console.error("Error creating product:", error);
        return next(new Error("An error occurred while creating the product. Please try again."));
    }
}

async function updateProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const newData = req.body;
        const response = await productsManager.update(pid, newData);
        if (!response) {
            handleError(`Unable to update: Product with ID ${pid} not found`, 404);
        }
        return res.status(200).json({ message: "Product updated successfully", response });
    } catch (error) {
        next(error);
    }
}

async function destroyProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const response = await productsManager.delete(pid);
        if (!response) {
            handleError(`Unable to delete: Product with ID ${pid} not found`, 404);
        }
        return res.status(200).json({ message: "Product deleted successfully", response });
    } catch (error) {
        next(error);
    }
}

async function showCatProduct(req, res, next) {
    try {
        const { category } = req.query;
        const products = await productsManager.readAll(category);
        if (products.length > 0) {
            return res.render("products", { products });
        }
        handleError("No products found for the given category", 404);
    } catch (error) {
        next(error);
    }
}

async function showAllProducts(req, res, next) {
    try {
        const { category } = req.query;
        const products = category ? await productsManager.readAll(category) : await productsManager.readAll();

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
        const { pid } = req.params;
        const product = await productsManager.read(pid);
        if (product) {
            return res.render("oneproduct", { one: product });
        }
        handleError(`Product with ID ${pid} not found`, 404);
    } catch (error) {
        next(error);
    }
}

async function adminProducts(req, res, next) {
    try {
        const { category } = req.query;
        const products = category
            ? await productsManager.readAll(category)
            : await productsManager.readAll();

        if (!products || products.length === 0) {
            return res.status(404).render("error", { message: "No products found." });
        }

        return res.render("admin", { data: products });
    } catch (error) {
        console.error("Error fetching products for admin:", error);
        return next(new Error("An error occurred while retrieving products. Please try again later."));
    }
}

async function deleteViewProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const deletedProduct = await productsManager.delete(pid);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        return next(new Error("An error occurred while trying to delete the product. Please try again later."));
    }
}

async function showEditProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const product = await productsManager.read(pid);

        if (!product) {
            return res.status(404).render("error", { message: "Product not found." });
        }

        return res.render("edit", { product });
    } catch (error) {
        console.error("Error fetching product for editing:", error);
        return next(new Error("An error occurred while retrieving the product for editing. Please try again later."));
    }
}

async function updateViewProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const updatedData = req.body;
        const updatedProduct = await productsManager.update(pid, updatedData);

        if (!updatedProduct) {
            return res.status(404).json({ error: `Product with ID: ${pid} not found.` });
        }

        return res.redirect('/products/admin');
    } catch (error) {
        console.error("Error updating product:", error);
        return next(new Error("An error occurred while trying to update the product. Please try again later."));
    }
}

async function createViewProduct(req, res, next) {
    try {
        const {
            title,
            photo = "defaultPFP.png",
            category = "default",
            price = 1,
            stock = 1
        } = req.body;

        const newProductData = { title, photo, category, price, stock };

        await productsManager.create(newProductData);
        return res.redirect('/products/admin');
    } catch (error) {
        console.error("Error creating product:", error);
        return next(new Error("An error occurred while trying to create the product. Please try again later."));
    }
}

export {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    destroyProduct,

    showAllProducts,
    showCatProduct,
    showOneProduct,
    adminProducts,
    deleteViewProduct,
    showEditProduct,
    updateViewProduct,
    createViewProduct
}