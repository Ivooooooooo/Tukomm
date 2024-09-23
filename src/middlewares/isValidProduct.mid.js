const isValidProduct = (req, res, next) => {
  const { title, stock, price, photo, category } = req.body;
  const errors = [];

  if (!title) {
    errors.push("Title is required.");
  }

  req.body.stock = typeof stock === "undefined" ? 1 : Number(stock);
  req.body.price = typeof price === "undefined" ? 1 : Number(price);
  req.body.category = category || "nocategory";

  if (isNaN(req.body.stock) || req.body.stock < 0) {
    errors.push("Stock must be a non-negative number. Defaulting to 1.");
  }

  if (isNaN(req.body.price) || req.body.price < 0) {
    errors.push("Price must be a non-negative number. Defaulting to 1.");
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.statusCode = 400;
    return next(error);
  }

  req.body.photo = photo || "defaultUrl.png";

  next();
};

export default isValidProduct;
