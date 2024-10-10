function validateNewProduct(req, res, next) {
    try {
        const { title, photo, category, price, stock } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Product name is mandatory." });
        }

        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

        if (isNaN(numericPrice) || numericPrice < 0) {
            return res.status(400).json({ error: "Product price must be a non-negative number." });
        }

        req.body.price = numericPrice;

        if (stock !== undefined) {
            const numericStock = typeof stock === 'string' ? parseInt(stock) : stock;
            if (isNaN(numericStock) || numericStock < 0) {
                return res.status(400).json({ error: "Stock must be a non-negative number." });
            }
            req.body.stock = numericStock;
        } else {
            req.body.stock = 1;
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: "An unexpected error occurred." });
    }
}

function validateProductModification(req, res, next) {
    const { title, photo, category, price, stock } = req.body;

    const hasChanges = title || photo || category || price !== undefined || stock !== undefined;

    if (!hasChanges) {
        return res.status(400).json({ error: "At least one field must be updated." });
    }

    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ error: "Product price must be a non-negative number." });
    }

    const numericStock = typeof stock === 'string' ? parseInt(stock) : stock;
    if (isNaN(numericStock) || numericStock < 0) {
        return res.status(400).json({ error: "Stock must be a non-negative number." });
    }

    next();
}

function validateNewUser(req, res, next) {
    const { username, email, password, role, photo } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email and password are required." });
    }

    next();
}

function validateUserModification(req, res, next) {
    const { email, password, role, photo } = req.body;

    const hasUpdates = email || password || role || photo;

    if (!hasUpdates) {
        return res.status(400).json({ error: "At least one field must be updated." });
    }

    next();
}

export {
    validateNewProduct,
    validateProductModification,
    validateNewUser,
    validateUserModification
};