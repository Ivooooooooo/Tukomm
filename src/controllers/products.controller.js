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

async function createGet(req, res, next) {
  try {
    const { title, price, quantity } = req.params;
    const { category = "none", supplier = "none" } = req.query;
    const response = await productsManager.create({
      title,
      price,
      quantity,
      category,
      supplier,
    });
    return res.status(201).json({ message: "Product created successfully", response });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const response = await productsManager.create(data);
    return res.status(201).json({ message: "Product created successfully", response });
  } catch (error) {
    next(error);
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

async function showProducts(req, res, next) {
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

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  destroyProduct,
  showProducts,
  showOneProduct
};